import { checkSchema } from "express-validator";
import { isValidMongooseId } from "../shared/commonValidation.mjs";

const idValidation =
{
    custom: isValidMongooseId
};

const startDateValidaiton = 
{
    matches:{
        options: /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]$/,
        errorMessage: "Please provide a valid date format: yyyy-MM-dd hh:MM"
    },
    customSanitizer: {
        options: (value) => new Date(value),
    }
};

export const createTourInstanceValidation = checkSchema({
    tourBaseId: idValidation,
    startDate: {
        ...startDateValidaiton,
        custom:{
            options: (value) => {
                if(value < Date.now()){
                    return false;
                } 
                return true;
            },
            errorMessage: "Date must be greater than current date"
        }
    }
});

export const deleteTourInstanceValidation = checkSchema({
    id:{
        in: ["params"],
        ...idValidation
    }
});

export const getAllUpcomingTourBaseTourInstancesValidation = checkSchema({
    tourBaseId: {
        in: ["params"],
        ...idValidation
    }
});