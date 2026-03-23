import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";



export interface IUser {
    name?: string;
    email: string;
    password?: string; // Optional for OAuth users
    provider?: 'credentials' | 'google' | 'github';
    providerId?: string; // OAuth provider user ID
    subscriptionStatus?: 'free' | 'active' | 'expired' | 'cancelled';
    subscriptionPlan?: 'free' | 'basic' | 'premium';
    subscriptionCurrentPeriodEnd?: Date;
    subscriptionId?: string;
    stripeCustomerId?: string;
    expiryReminderSent?: boolean;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    apiKeyHash?: string;
    apiKeyPrefix?: string;
    apiKeyCreatedAt?: Date;
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: false },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: false }, // Optional for OAuth
        provider: { 
            type: String, 
            enum: ['credentials', 'google', 'github'],
            default: 'credentials'
        },
        providerId: { type: String, required: false },
        subscriptionStatus: {
            type: String,
            enum: ['free', 'active', 'expired', 'cancelled'],
            default: 'free'
        },
        subscriptionPlan: {
            type: String,
            enum: ['free', 'basic', 'premium'],
            default: 'free'
        },
        subscriptionCurrentPeriodEnd: { type: Date },
        subscriptionId: { type: String },
        stripeCustomerId: { type: String },
        expiryReminderSent: { type: Boolean, default: false },
        resetPasswordToken: { type: String },
        resetPasswordExpires: { type: Date },
        apiKeyHash: { type: String },
        apiKeyPrefix: { type: String },
        apiKeyCreatedAt: { type: Date },
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if(this.isModified("password") && this.password){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

export const User = models?.User || model<IUser>("User", userSchema);

export default User;
