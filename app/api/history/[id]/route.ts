import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import History from "@/models/History";
import { dbconnect } from "@/lib/db";
import { authOptions } from "@/lib/auth";


export async function DELETE(req: NextRequest,
    {params} : {params: {id:string}}
){
    try {
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

        const history = await History.findById(params.id);

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

        if(history.userId.toString() !== session.user.id){
            return NextResponse.json(
                {
                    error: "Unauthorized"
                },
                {
                    status: 403
                }
            )
        }

        await History.findOneAndDelete({ _id: params.id });

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