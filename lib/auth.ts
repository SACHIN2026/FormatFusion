import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import User from "@/models/User";
import { dbconnect } from "./db";
import bcrypt from "bcryptjs";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                try {
                    await dbconnect();
                    const user = await User.findOne({ email: credentials.email });
                    if (!user) {
                        throw new Error("No user found with this email");
                    }

                    const isValid = await bcrypt.compare(credentials.password, user.password);

                    if (!isValid) {
                        throw new Error("Invalid password");
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                    };

                } catch (error) {
                    console.error("Error in authorize:", error);
                    throw new Error("Internal server error");

                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],

    callbacks:{
        async signIn({ user, account, profile }) {
            if (account?.provider === 'google' || account?.provider === 'github') {
                try {
                    await dbconnect();
                    
                    const existingUser = await User.findOne({ email: user.email });
                    
                    if (!existingUser) {
                        // Create new user for OAuth
                        await User.create({
                            name: user.name || profile?.name || user.email,
                            email: user.email,
                            provider: account.provider,
                            providerId: account.providerAccountId,
                            // No password for OAuth users
                        });
                    }
                    
                    return true;
                } catch (error) {
                    console.error('Error in OAuth signIn:', error);
                    return false;
                }
            }
            return true;
        },
        async jwt({token, user}){
            if(user){
                token.id = user.id;
            }
            return token;
        },
        async session({session, token}){
            if(session.user){
                session.user.id = token.id as string;
            }
            return session;
        },

        

    },

    pages: {
            signIn: "/login",
            error: "/login",
            signOut: "/signout",
        },

        session: {
            strategy: "jwt",
            maxAge: 30 * 24 * 60 * 60, // 30 days
        },

        secret: process.env.NEXTAUTH_SECRET,
}