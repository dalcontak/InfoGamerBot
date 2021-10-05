import { Document, model, Schema } from "mongoose";

export interface DataGamerInt extends Document {
    discordId: string;
    nameGame: string;
    nick: string;
    timestamp: number;
}

export const DataGamer = new Schema({
    discordId: String,
    nameGame: String,
    nick: String,
    timestamp: Number
});

export default model<DataGamerInt>("dataGamers", DataGamer);