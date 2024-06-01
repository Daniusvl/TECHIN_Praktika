import { checkSchema } from "express-validator";
import { isValidMongooseId } from "../../shared/commonValidation.mjs";

export const createTourCandidateValidation = checkSchema({
    tourInstanceId:{
        in:["params"],
        custom: isValidMongooseId
    }
});

export const deleteTourCandidateValdiation = checkSchema({
    id:{
        in:["params"],
        custom: isValidMongooseId
    }
});

export const changeTourInstanceValdiation = checkSchema({
    tourCandidateId:{
        custom: isValidMongooseId
    },
    tourInstanceId:{
        custom: isValidMongooseId
    }
});

export const leaveReviewValidation = checkSchema({
    tourCandidateId:{
        custom: isValidMongooseId
    },
    score:{
        isNumeric:{
            errorMessage: "Score must be a valid number"
        },
        custom:{
            options: (value) => value > 0 && value < 11,
            errorMessage: "Score must be a number between 1 and 10"
        }
    },
    review:{
        isString:{
            errorMessage:"Review must be a valid string"
        },
        isLength:{
            options: {min: 0, max: 500},
            errorMessage: "Review must be maximum 500 characters long"
        }
    }
});

export const getMyHistoryTourCandidatesValidation = checkSchema({
    page:{
        in:["params"],
        isNumeric:{
            errorMessage: "Page must be a valid number that starts with 1"
        },
        custom:{
            options: (value) => value > 0,
            errorMessage: "Page must be a valid number that starts with 1"
        }
    }
});