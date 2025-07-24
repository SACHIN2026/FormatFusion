import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import mongoose from "mongoose";
import History from "@/models/History";
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

        const history = await History.find({ userId: session.user.id }).sort({ createdAt: -1 });

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

        const historyRecord = await History.create({
            url: data.url,
            userId: new mongoose.Types.ObjectId(session.user.id),
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