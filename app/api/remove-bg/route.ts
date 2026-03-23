import { removeBackgroundFromImageBase64 } from 'remove.bg';
import { authOptions } from "@/lib/auth";
import { dbconnect } from "@/lib/db";
import { v2 as cloudinary } from "cloudinary"
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import History from "@/models/History";
import User from "@/models/User";
import mongoose from "mongoose";
import { extractApiKeyFromHeaders, getUserByApiKey } from "@/lib/api-key";


cloudinary.config({
    secure: true,
})

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);


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

    // const format = formdata.get("format") as string;


    // get file data

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    // const originalFormat = file.name.split('.').pop()?.toLowerCase() || 'unknown';
    // const originalSize = buffer.length;
    const fileName = `${Date.now()}-${file.name.split('.')[0]}`;

    const base64Image = buffer.toString('base64');

    // remove bg
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

        const result = await removeBackgroundFromImageBase64({
            base64img: base64Image,
            apiKey: process.env.REMOVE_BG_API_KEY!,
            size: "full",
            type: "auto",
        })

        const b64 = Buffer.from(result.base64img, 'base64').toString('base64');
        const dataUri = `data:image/png;base64,${b64}`;

        const upload = await new Promise<{ secure_url: string;[key: string]: unknown }>((resolve, reject) => {
            cloudinary.uploader.upload(dataUri, {
                resource_type: "image",
                folder: "remove-bg",
                public_id: fileName
            }, (error, result) => {
                if (error) {
                    reject(error);
                } else if (result) {
                    resolve(result);
                } else {
                    reject(new Error("Upload failed - no result returned"));
                }
            });
        });

        // Save to database
        const image = await History.create({
            name: file.name,
            url: upload.secure_url,
            userId: userObjectId,
            beforeFormat: file.name.split(".").pop()?.toLowerCase() || "unknown",
            afterFormat: "png",
            beforeSize: buffer.length,
            afterSize: Buffer.from(result.base64img, "base64").length,
            status: 'completed',
            removedBg: true,
        })


        return NextResponse.json({
            message: "Background removed successfully",
            url: image.url,
            id: image._id.toString(),
            beforeFormat: image.beforeFormat,
            afterFormat: "png",
            beforeSize: image.beforeSize,
            afterSize: image.afterSize,
            quality: 100,
            removedBg: true,
        });

    } catch (error) {
        console.error("Error removing background:", error);
        return NextResponse.json(
            {
                error: "Failed to remove background"
            },
            {
                status: 500
            }
        );
    }

}