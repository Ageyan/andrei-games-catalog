import mongoose, { Document } from "mongoose";

export interface IFavoriteGame extends Document {
    id: number;
    name: string;
    background_image?: string;
    rating?: number;
    released?: string;
    user: mongoose.Types.ObjectId
}