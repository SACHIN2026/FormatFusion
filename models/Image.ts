import mongoose, { Schema, model, models } from "mongoose";

export interface IImage {
    url: string;
    userId: mongoose.Types.ObjectId;
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
    beforeFormat: string;
    afterFormat: string;
    name: string;
    beforeSize: number;
    afterSize: number;
}

const imageSchema = new Schema<IImage>(
    {
        url : { type: String, required: true},
        userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
        beforeFormat: {type: String, required: true},
        afterFormat: {type: String, required: true},
        name: {type: String, required: true},
        beforeSize: {type: Number, required: true},
        afterSize: {type: Number, required: true},

    },{
        timestamps: true
    }
)

export const Image = models?.Image || model<IImage>("Image", imageSchema);

export default Image;