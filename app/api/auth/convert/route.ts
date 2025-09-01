import { authOptions } from "@/lib/auth";
import { dbconnect } from "@/lib/db";
import { v2 as cloudinary } from "cloudinary"
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import Image from "@/models/Image";
import User from "@/models/User";
import mongoose from "mongoose";


cloudinary.config({
    secure: true,
})

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    // image file upload
    const formdata = await request.formData();
    const file = formdata.get("file") as File;
    if (!file) {
        return NextResponse.json(
            {
                error: "No file provided"
            }, {
            status: 400
        }
        )
    }

    const format = formdata.get("format") as string;
    const quality = parseInt(formdata.get("quality") as string) || 80;

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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const originalFormat = file.name.split('.').pop()?.toLowerCase() || 'unknown';
    const originalSize = buffer.length;
    const fileName = `${Date.now()}-${file.name.split('.')[0]}`;

    // //upload dir

    // const uploadDir = path.join(process.cwd(), "public", "uploads");
    // await mkdir(uploadDir, { recursive: true });

    // convert image
    try {

        let processedImage;
        switch (format) {
            case "jpeg":
            case "jpg":
                processedImage = await sharp(buffer)
                    .jpeg({ quality })
                    .toBuffer();
                break;

            case "png":
                processedImage = await sharp(buffer)
                    .png({ quality })
                    .toBuffer();
                break;

            case "webp":
                processedImage = await sharp(buffer)
                    .webp({ quality })
                    .toBuffer();
                break;
            case "avif":
                processedImage = await sharp(buffer)
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

        //save to db

        await dbconnect();
        
        // Validate and convert session user ID to ObjectId
        if (!session.user.id) {
            return NextResponse.json(
                { error: "Invalid user session" },
                { status: 401 }
            );
        }
        
        let userObjectId: mongoose.Types.ObjectId;
        try {
            userObjectId = new mongoose.Types.ObjectId(session.user.id);
        } catch {
            // If session.user.id is not a valid ObjectId, find user by email
            const dbUser = await User.findOne({ email: session.user.email });
            if (!dbUser) {
                return NextResponse.json(
                    { error: "User not found in database" },
                    { status: 404 }
                );
            }
            userObjectId = dbUser._id;
        }
        
        const newImage = await Image.create({
            url: cloudinaryResponse.secure_url,
            userId: userObjectId,
            beforeFormat: originalFormat,
            afterFormat: format,
            name: file.name,
            beforeSize: originalSize,
            afterSize: processedImage.length,
            quality: quality,
        });

        //img details
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