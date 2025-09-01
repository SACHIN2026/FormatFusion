import { removeBackgroundFromImageBase64 } from 'remove.bg';
import { authOptions } from "@/lib/auth";
import { dbconnect } from "@/lib/db";
import { v2 as cloudinary } from "cloudinary"
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Image from "@/models/Image";


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
        const result = await removeBackgroundFromImageBase64({
            base64img: base64Image,
            apiKey: process.env.REMOVE_BG_API_KEY!,
            size: "regular",
            type: "auto",
            scale: "50%"
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
        await dbconnect();
        const image = await Image.create({
            name: fileName,
            url: upload.secure_url,
            userId: session.user.id,
            beforeFormat: file.name.split(".").pop()?.toLowerCase() || "unknown",
            afterFormat: "png",
            beforeSize: buffer.length,
            afterSize: Buffer.from(result.base64img, "base64").length,
            quality: 100,
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