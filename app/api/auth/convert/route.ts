import { authOptions } from "@/lib/auth";
import { dbconnect } from "@/lib/db";
import { v2 as cloudinary } from "cloudinary"
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import History from "@/models/History";
import User from "@/models/User";
import mongoose from "mongoose";
import { extractApiKeyFromHeaders, getUserByApiKey } from "@/lib/api-key";


cloudinary.config({
    secure: true,
})

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);

    // image file upload or remote URL
    const formdata = await request.formData();
    const file = formdata.get("file") as File | null;
    const imageUrl = ((formdata.get("imageUrl") as string | null) || "").trim();

    if (!file && !imageUrl) {
        return NextResponse.json(
            {
                error: "No file or image URL provided"
            }, {
            status: 400
        }
        )
    }

    const format = formdata.get("format") as string;
    const quality = parseInt(formdata.get("quality") as string) || 80;
    const widthValue = parseInt((formdata.get("width") as string) || "", 10);
    const heightValue = parseInt((formdata.get("height") as string) || "", 10);
    const resizeFitRaw = ((formdata.get("fit") as string) || "inside").toLowerCase();
    const width = Number.isFinite(widthValue) && widthValue > 0 ? widthValue : undefined;
    const height = Number.isFinite(heightValue) && heightValue > 0 ? heightValue : undefined;
    const resizeFit = ["inside", "cover", "contain", "fill"].includes(resizeFitRaw) ? resizeFitRaw : "inside";

    if (!format || !["jpeg", "png", "jpg", "webp", "avif"].includes(format)) {
        return NextResponse.json(
            {
                error: "Invalid format provided"
            }, {
            status: 400
        }
        );
    }


    // get file data

    let buffer: Buffer;
    let originalFormat = 'unknown';
    let originalName = 'remote-image';

    if (file) {
        const bytes = await file.arrayBuffer();
        buffer = Buffer.from(bytes);
        originalFormat = file.name.split('.').pop()?.toLowerCase() || 'unknown';
        originalName = file.name;
    } else {
        try {
            const parsed = new URL(imageUrl);
            if (!['http:', 'https:'].includes(parsed.protocol)) {
                return NextResponse.json({ error: "Invalid image URL" }, { status: 400 });
            }

            const remote = await fetch(imageUrl);
            if (!remote.ok) {
                return NextResponse.json({ error: "Failed to fetch image URL" }, { status: 400 });
            }

            const bytes = await remote.arrayBuffer();
            buffer = Buffer.from(bytes);

            const contentType = remote.headers.get('content-type') || '';
            if (contentType.startsWith('image/')) {
                originalFormat = contentType.split('/')[1].toLowerCase();
            }

            const pathname = parsed.pathname || '';
            const lastSegment = pathname.split('/').pop() || 'remote-image';
            originalName = decodeURIComponent(lastSegment || 'remote-image');
            if (!originalFormat || originalFormat === 'unknown') {
                originalFormat = originalName.split('.').pop()?.toLowerCase() || 'unknown';
            }
        } catch {
            return NextResponse.json({ error: "Invalid image URL" }, { status: 400 });
        }
    }

    const originalSize = buffer.length;
    const fileName = `${Date.now()}-${originalName.split('.')[0] || 'image'}`;

    // convert image
    try {
        await dbconnect();

        // Resolve authenticated user from session or API key
        let userObjectId: mongoose.Types.ObjectId;

        if (session?.user) {
            try {
                userObjectId = new mongoose.Types.ObjectId(session.user.id);
            } catch {
                const dbUser = await User.findOne({ email: session.user.email });
                if (!dbUser) {
                    return NextResponse.json({ error: "User not found" }, { status: 404 });
                }
                userObjectId = dbUser._id;
            }
        } else {
            const apiKey = extractApiKeyFromHeaders(request.headers);
            if (!apiKey) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }

            const apiUser = await getUserByApiKey(apiKey);
            if (!apiUser) {
                return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
            }

            userObjectId = apiUser._id;
        }

        // Enforce subscription expiry
        const user = await User.findById(userObjectId);
        const isActive = user?.subscriptionStatus === 'active' &&
            user?.subscriptionCurrentPeriodEnd &&
            new Date(user.subscriptionCurrentPeriodEnd) > new Date();
        if (user?.subscriptionStatus === 'active' && !isActive) {
            await User.updateOne({ _id: userObjectId }, { $set: { subscriptionStatus: 'expired' } });
        }
        const effectivePlan = isActive ? user?.subscriptionPlan : 'free';

        // Enforce free plan limit (5 per month)
        if (effectivePlan === 'free') {
            const startOfMonth = new Date();
            startOfMonth.setDate(1);
            startOfMonth.setHours(0, 0, 0, 0);
            const count = await History.countDocuments({ userId: userObjectId, createdAt: { $gte: startOfMonth } });
            if (count >= 5) {
                return NextResponse.json(
                    { error: "Free plan limit reached (5/month). Please upgrade to continue.", limitReached: true },
                    { status: 403 }
                );
            }
        }

        const processor = sharp(buffer);
        if (width || height) {
            processor.resize({
                width,
                height,
                fit: resizeFit as "inside" | "cover" | "contain" | "fill",
            });
        }

        let processedImage;
        switch (format) {
            case "jpeg":
            case "jpg":
                processedImage = await processor
                    .jpeg({ quality })
                    .toBuffer();
                break;

            case "png":
                processedImage = await processor
                    .png({ quality })
                    .toBuffer();
                break;

            case "webp":
                processedImage = await processor
                    .webp({ quality })
                    .toBuffer();
                break;
            case "avif":
                processedImage = await processor
                    .avif({ quality })
                    .toBuffer();
                break;

            default:
                return NextResponse.json(
                    { error: "Unsupported format" },
                    { status: 400 }
                );

        };

        // // save processed image
        // const outputPath = path.join(uploadDir, `${fileName}.${format}`);
        // await writeFile(outputPath, processedImage);


        //Upload to cloudinary
        const b64 = Buffer.from(processedImage).toString("base64");
        const dataUri = `data:image/${format};base64,${b64}`;

        interface CloudinaryUploadResult {
            secure_url: string;
            [key: string]: unknown;
        }
        const cloudinaryResponse = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
            cloudinary.uploader.upload(dataUri, {
                folder: "image-converter",
                public_id: fileName,
                format: format,
            },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result as CloudinaryUploadResult);
                    }
                }
            )
        })

        // save to db
        const newImage = await History.create({
            url: cloudinaryResponse.secure_url,
            userId: userObjectId,
            beforeFormat: originalFormat,
            afterFormat: format,
            name: originalName,
            beforeSize: originalSize,
            afterSize: processedImage.length,
            status: 'completed',
        });

        // return img details
        return NextResponse.json({
            message: "Image uploaded successfully",
            id: newImage._id.toString(),
            url: newImage.url,
            beforeFormat: newImage.beforeFormat,
            afterFormat: newImage.afterFormat,
            beforeSize: newImage.beforeSize,
            afterSize: newImage.afterSize,
            quality: newImage.quality,
            compressionRate: Math.round((1 - (newImage.afterSize / newImage.beforeSize)) * 100),
        }, {
            status: 200
        })

    } catch (error) {
        console.error("Error processing image:", error);
        return NextResponse.json(
            { error: "Error processing image" },
            { status: 500 }
        );

    }


}