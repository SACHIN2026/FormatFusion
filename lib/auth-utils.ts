import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import User from "@/models/User";
import { dbconnect } from "@/lib/db";
import mongoose from "mongoose";

/**
 * Get the MongoDB ObjectId for the current authenticated user
 * Handles both credential and OAuth users by looking up the database user
 */
export async function getCurrentUserId(): Promise<mongoose.Types.ObjectId | null> {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user?.email) {
            return null;
        }

        await dbconnect();
        
        // First try to convert session.user.id to ObjectId if it exists and is valid
        if (session.user.id) {
            try {
                return new mongoose.Types.ObjectId(session.user.id);
            } catch {
                // If conversion fails, fall back to email lookup
            }
        }
        
        // Look up user by email to get their database ObjectId
        const dbUser = await User.findOne({ email: session.user.email });
        return dbUser?._id || null;
        
    } catch (error) {
        console.error('Error getting current user ID:', error);
        return null;
    }
}

/**
 * Get the current user session and validate authentication
 */
export async function getAuthenticatedUser() {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
        return { error: "Unauthorized", status: 401 };
    }
    
    const userId = await getCurrentUserId();
    
    if (!userId) {
        return { error: "User not found in database", status: 404 };
    }
    
    return { session, userId };
}
