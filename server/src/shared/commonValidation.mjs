import { isValidObjectId } from "mongoose";

export const isValidMongooseId = {
    options: (value) => isValidObjectId(value),
    errorMessage: "Id must be a 24 characters long hex string"
};

export const isBoolean = (fieldName) => {
    return {
        customSanitizer: {
            options: (value) => {
                if(value === undefined || value === null || value === "false" || value === false || value === 0){
                    return false;
                }
                else return true;
            },
            errorMessage: `${fieldName} must be a boolean`
        }};
};

export const isNumber = (fieldName) => {
    return {
        customSanitizer: {
            options: (value) => Number(value),
            errorMessage: `${fieldName} must be a number`
        }};
};