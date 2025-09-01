import { NextRequest, NextResponse } from "next/server";
import {dbconnect} from "@/lib/db";
import User from "@/models/User";

export async function POST(request : NextRequest){
    try {
       const {email, password} =  await request.json()

       if(!email || !password){
            return NextResponse.json(
                {error: "Email and password are required"},
                {status: 400}
            );
       }

       await dbconnect();

       const existingUser = await User.findOne({email});
       if(existingUser){
        return NextResponse.json({
            error: "user alrady exisits with this email"
        }
        , {status: 400});
       }

       await User.create({
        email, password
       });

       return NextResponse.json(
        {
            message : "user created successfully"
        },
        {
            status: 201
        }
       ); 

    } catch (error) {
        console.error("Error in registration:", error);
        return NextResponse.json(
            {error: "Internal server error"},
            {status: 500}
        );
    }
}
