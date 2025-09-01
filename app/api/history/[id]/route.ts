import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import History from "@/models/History";
import User from "@/models/User";
import { dbconnect } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import mongoose from "mongoose";


export async function DELETE(req: NextRequest,
    context: { params: Promise<{ id: string }> }
){
    try {

        const {id} = await context.params;
        const session = await getServerSession(authOptions);

        if(!session?.user){
            return NextResponse.json(
                {
                    error: "unauthorized"
                },
                {
                    status : 401
                }
            )
        }

        await dbconnect();

        const history = await History.findById(id);

        if(!history){
            return NextResponse.json(
                {
                    error: "History not found"
                },
                {
                    status: 404
                }
            )
        }

        // Validate and convert session user ID to ObjectId for comparison
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

        if(history.userId.toString() !== userObjectId.toString()){
            return NextResponse.json(
                {
                    error: "Unauthorized"
                },
                {
                    status: 403
                }
            )
        }

        await History.findOneAndDelete({ _id:id });

        return NextResponse.json(
            {
                message: "History deleted successfully"
            },
            {
                status: 200
            }
        )

    } catch (error) {
        console.error("Error deleting history:", error);
        return NextResponse.json(
            {
                error: "Failed to delete history"
            },
            {
                status: 500
            }
        )
        
    }
}