import { Schema, model } from "mongoose";

const DEFAULT_ROLE = "USER";

const userModel = Schema(
    {
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        role: { type: String, required: true, default: DEFAULT_ROLE }
    },
    { 
        versionKey: false 
    }
);

export default model("User", userModel, "Users");