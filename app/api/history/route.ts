import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import mongoose from "mongoose";
import History from "@/models/History";
import User from "@/models/User";
import { dbconnect } from "@/lib/db";
import { authOptions } from "@/lib/auth";
// import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }

        await dbconnect();

        // Validate and convert session user ID to ObjectId
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

        const history = await History.find({ userId: userObjectId }).sort({ createdAt: -1 });

        return NextResponse.json(history);

    } catch (error) {
        console.error("Error fetching history:", error);
        return NextResponse.json({
            error: "Failed to fetch history"
        }, {
            status: 500
        });
    }

}


export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json(
                {
                    error: "Unauthorized"
                }, {
                status: 401
            }
            )
        }

        const data = await req.json();

        await dbconnect();

        // Validate and convert session user ID to ObjectId
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

        const historyRecord = await History.create({
            url: data.url,
            userId: userObjectId,
            beforeFormat: data.beforeFormat,
            afterFormat: data.afterFormat,
            name: data.name,
            beforeSize: data.beforeSize,
            afterSize: data.afterSize,
            status: data.status || 'completed',
        })

        return NextResponse.json(historyRecord);

    } catch (error) {
        console.error("Error creating history record:", error);
        return NextResponse.json({
            error: "Failed to create history record"
        }, {
            status: 500
        });
    }
}