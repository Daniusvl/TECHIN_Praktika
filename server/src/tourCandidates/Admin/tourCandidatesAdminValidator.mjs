import { checkSchema } from "express-validator";
import { isValidMongooseId } from "../../shared/commonValidation.mjs";

const pageValidator = {
    in: ["params"],
    isNumeric:{
        errorMessage: "Page must be a valid number that starts with 1"
    },
    custom:{
        options: (value) => value > 0,
        errorMessage: "Page must be a valid number that starts with 1"
    }
};

export const getAllActiveTourCandidatesValidator = checkSchema({
    page: pageValidator
});

export const getAllHistoryTourCandidatesValidator = checkSchema({
    page: pageValidator
});

export const approveTourCandidateValidator = checkSchema({
    tourCandidateId: {
        in: ["params"],
        custom: isValidMongooseId
    }
});

export const rejectTourCandidateValidator = checkSchema({
    tourCandidateId: {
        custom: isValidMongooseId
    },
    statusMessage: {
        isString:{
            errorMessage:"Status message must be a valid string"
        },
        isLength:{
            options: {min: 3, max: 500},
            errorMessage: "Status message must be between 3 and 500 characters long"
        }
    }
});