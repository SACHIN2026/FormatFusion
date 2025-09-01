import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";



export interface IUser {
    email: string;
    password: string;
    subscriptionStatus?: 'free' | 'active' | 'expired' | 'cancelled';
    subscriptionPlan?: 'free' | 'basic' | 'premium';
    subscriptionCurrentPeriodEnd?: Date;
    subscriptionId?: string;
    stripeCustomerId?: string;
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
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
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if(this.isModified("password")){
        (this as any).password = await bcrypt.hash((this as any).password, 10);
    }
    next();
});

export const User = models?.User || model<IUser>("User", userSchema);

export default User;
