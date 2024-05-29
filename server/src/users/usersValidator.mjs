import { checkSchema } from "express-validator";
import { isValidObjectId } from "mongoose";

export const RegisterValidation = checkSchema({
    email: {
        isEmail: {
            errorMessage: "Email must be valid",
        },
    },
    password: {
        isLength: {
            options: { min: 8, max: 20 },
            errorMessage: "Password must be between 8 and 20 characters",
        },
        matches: {
            options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~#^_+=\-';,./|":<>?])[A-Za-z\d@$!%*?&~#^_+=\-';,./|":<>?]{8,128}$/,
            errorMessage: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        },
    },
    repeatPassword: {
        custom: {
            options: (value, { req }) => value === req.body.password,
            errorMessage: "Passwords do not match"
        },
    }
});

export const LoginValidation = checkSchema({
    email: {
        isEmail: {
            errorMessage: "Email must be valid",
        },
    },
    password: {
        isLength: {
            options: { min: 8, max: 20 },
            errorMessage: "Password must be between 8 and 20 characters",
        },
        matches: {
            options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~#^_+=\-';,./|":<>?])[A-Za-z\d@$!%*?&~#^_+=\-';,./|":<>?]{8,128}$/,
            errorMessage: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        },
    },
});

export const getByIdValidation = checkSchema({
    id:{
        in:["params"],
        custom: {
            options: (value) => isValidObjectId(value),
            errorMessage: "Id must be a 24 characters long hex string"
        }
    }
});