import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

import userModel from "./userModel.mjs";
import { responseMessage } from "../shared/responseMessage.mjs";
import { serviceResponse } from "../shared/serviceResponse.mjs";

/* global process */

const USER_ALREADY_EXISTS = responseMessage("This user already exists");
const INVALID_EMAIL_OR_PASSWORD = responseMessage("Invalid email/password");
const NOT_FOUND = responseMessage("user not found");

export const usersService = {
    createUser: async (data) => {
        const {email, password} = data;
        
        const doesExist = await userModel.findOne({ email });
        
        if(doesExist){
            return serviceResponse(409, USER_ALREADY_EXISTS);
        }
        
        const hashedPassword = await bcrypt.hash(password, 8);

        const user = {
            email,
            password: hashedPassword
        };

        const result = await userModel.create(user);

        const newUser = {
            _id: result._id,
            email: result.email,
            role: result.role
        };

        return serviceResponse(201, newUser);
    },

    loginUser: async (data) => {
        const {email, password} = data;

        const user = await userModel.findOne({email});

        if(!user){
            return serviceResponse(401, INVALID_EMAIL_OR_PASSWORD);
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return serviceResponse(401, INVALID_EMAIL_OR_PASSWORD);
        }

        const newUser = {
            _id: user._id,
            email: user.email,
            role: user.role
        };

        const token = jwt.sign( {user: newUser} , process.env.JWT_ACCESS_TOKEN, {
            expiresIn: "1h",
        });

        return serviceResponse(200, {token});
    },

    getUserById: async (id) => {
        const user = await userModel.findById(id);

        if(!user){
            return serviceResponse(404, NOT_FOUND);
        }

        const newUser = {
            _id: user._id,
            email: user.email,
            role: user.role
        };

        return serviceResponse(200, newUser);
    },
};