import { Schema, model } from "mongoose";
import { ROLES, USER } from "../shared/config/UserRoles.mjs";

const userModel = Schema(
    {
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        role: { type: String, enum: ROLES, required: true, default: USER }
    },
    { 
        versionKey: false 
    }
);

export default model("User", userModel, "Users");