import { checkSchema } from "express-validator";
import { isValidMongooseId } from "../shared/commonValidation.mjs";

const tourBaseIdValidation =
{
    custom: isValidMongooseId
};

const startDateValidaiton = 
{
    matches:{
        options: /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]$/,
        errorMessage: "Please provide a valid date format: yyyy-MM-dd hh:MM"
    }
};

export const createTourInstanceValidation = checkSchema({
    tourBaseId: tourBaseIdValidation,
    startDate: startDateValidaiton
});

export const deleteTourInstanceValidation = checkSchema({
    tourBaseId: tourBaseIdValidation,
    startDate: startDateValidaiton
});