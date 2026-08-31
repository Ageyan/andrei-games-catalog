import mongoose, { Schema } from "mongoose";

import type { IUser } from "../types/user.types";

const userSchema = new Schema<IUser>(
    {
        userName: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    }
) 

const User = mongoose.model<IUser>('User', userSchema);

export default User;