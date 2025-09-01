import mongoose, { Schema, model, models } from "mongoose";


export interface IHistory {
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
    status?: string;
}

const historySchema = new Schema<IHistory>(
    {
        url : { type: String, required: true},
        userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
        beforeFormat: {type: String, required: true},
        afterFormat: {type: String, required: true},
        name: {type: String, required: true},
        beforeSize: {type: Number, required: true},
        afterSize: {type: Number, required: true},
        status: {type: String, enum: ['completed', 'failed', 'processing'], default: 'completed'},

    },{
        timestamps: true
    }
)

export const History = models?.History || model<IHistory>("History", historySchema);

export default History;