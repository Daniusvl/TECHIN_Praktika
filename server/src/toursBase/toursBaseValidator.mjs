import { checkSchema } from "express-validator";
import { imageExtensions } from "../shared/config/imageExtensions.mjs";
import { isValidMongooseId } from "../shared/commonValidation.mjs";

const nameValidation = 
{
    isLength: {
        options: { min: 3, max: 50 },
        errorMessage: "Name must be between 3 and 50 characters",
    }
};

const descriptionValidation = 
{
    isLength: {
        options: { min: 3, max: 500 },
        errorMessage: "Description must be between 3 and 500 characters",
    }
};

export const minPrice = 0;

export const maxPrice = 100000;

const priceValidation =
{
    isDecimal: {
        // eslint-disable-next-line camelcase
        options: {decimal_digits:2},
        errorMessage: "price must be a decimal number with exactly two digits after the decimal point"
    },
    custom: {
        options: (value) => {
            const price = parseFloat(value);
            if (price < minPrice || price > maxPrice) {
                throw new Error(`Price must be between ${minPrice} and ${maxPrice}`);
            }
            return true;
        }
    }
};

export const minDuration = 1;

export const maxDuration = 24*7;

const durationInHoursValidation = 
{
    isNumeric: {
        errorMessage: "duration must be a valid number"
    },
    custom: {
        options: (value) => {
            const duration = parseFloat(value);
            if (duration < minDuration || duration > maxDuration) {
                throw new Error(`Duration must be between ${minDuration} and ${maxDuration}`);
            }
            return true;
        }
    }
};

const isSingleValidation = 
{
    isBoolean:{
        errorMessage: "isSingle must be a boolean value"
    }
};

const sortByArray = [
    "name",
    "price",
    "isSingle",
    "avgScore",
    "durationInHours"
];

const booleanSanitizer = (fieldName) => {
    return {
        options: (value) => {
            if(value === undefined || value === null || value === "false" || value === false || value === 0){
                return false;
            }
            else return true;
        },
        errorMessage: `${fieldName} must be a boolean`
    };
};

const numberSanitizer = (fieldName) => {
    return {
        options: (value) => Number(value),
        errorMessage: `${fieldName} must be a number`
    };
};

export const getToursBaseValidator = checkSchema({
    priceFree:{
        in:["query"],
        optional: true,
        customSanitizer: booleanSanitizer("priceFree")
    },
    minPrice: {
        in:["query"],
        optional: true,
        customSanitizer: numberSanitizer("minPrice"),
        custom: {
            options: (value, {req}) => {
                console.log("typeof value", typeof value);
                if(value > req.query.maxPrice){
                    throw new Error("minPrice cannot be greater than maxPrice");
                }
                return true;
            }
        }
    },
    maxPrice: {
        in:["query"],
        optional: true,
        customSanitizer: numberSanitizer("maxPrice"),
        custom: {
            options: (value, {req}) => {
                if(value < req.query.minPrice){
                    throw new Error("maxPrice cannot be smaller than minPrice");
                }
                return true;
            }
        }
    },
    singleOnly:{
        in:["query"],
        optional: true,
        customSanitizer: booleanSanitizer("singleOnly")
    },
    multipleOnly:{
        in:["query"],
        optional: true,
        customSanitizer: booleanSanitizer("multipleOnly")
    },
    minDuration: {
        in:["query"],
        optional: true,
        customSanitizer: numberSanitizer("minDuration"),
        custom: {
            options: (value, {req}) => {
                if(value > req.query.maxDuration){
                    throw new Error("minDuration cannot be greater than maxDuration");
                }
                return true;
            }
        }
    },
    maxDuration: {
        in:["query"],
        optional: true,
        customSanitizer: numberSanitizer("maxDuration"),
        custom: {
            options: (value, {req}) => {
                if(value < req.query.minDuration){
                    throw new Error("maxDuration cannot be smaller than minDuration");
                }
                return true;
            }
        }
    },
    minScore: {
        in:["query"],
        optional: true,
        customSanitizer: numberSanitizer("minScore"),
        custom: {
            options: (value, {req}) => {
                if(value > req.query.maxScore){
                    throw new Error("minScore cannot be greater than maxScore");
                }
                return true;
            }
        }
    },
    maxScore: {
        in:["query"],
        optional: true,
        customSanitizer: numberSanitizer("maxScore"),
        custom: {
            options: (value, {req}) => {
                if(value < req.query.minScore){
                    throw new Error("maxScore cannot be smaller than minScore");
                }
                return true;
            }
        }
    },
    searchNameQuery:{
        in:["query"],
        optional: true,
        isString:{
            errorMessage: "searchNameQuery must be a string"
        },
        isLength: {
            options: { min: 1, max: 50 },
            errorMessage: "searchNameQuery must be between 1 and 50 characters",
        }
    },
    desc:{
        in:["query"],
        optional: true,
        customSanitizer: booleanSanitizer("desc")
    },
    sortBy:{
        in:["query"],
        optional: true,
        isString:{
            errorMessage: "sortBy must be a string"
        },
        custom:{
            options: (value) =>{
                if(!sortByArray.includes(value)){
                    throw new Error(`sortBy can be only: ${sortByArray.join(", ")}`);
                }
                return true;
            }
        }
    }
});

export const createTourBaseValidation = checkSchema({
    name: nameValidation,
    description: descriptionValidation,
    price: priceValidation,
    durationInHours:durationInHoursValidation,
    isSingle: isSingleValidation,
    image:{
        custom: {
            options: (value, { req }) => {
                if(!req.files || !req.files.image){
                    throw new Error("image must be provided");
                }
                const { image } = req.files;
                if(image.name && imageExtensions.filter(ext => image.name.includes(ext)).length > 0){
                    return true;
                }
                throw new Error(`image must be a file with specified extensions ${imageExtensions.join(", ")}`);
            }
        }
    }
});

export const updateTourBaseValidation = checkSchema({
    _id: {
        custom: isValidMongooseId
    },
    name: nameValidation,
    description: descriptionValidation,
    price: priceValidation,
    durationInHours:durationInHoursValidation,
    isSingle: isSingleValidation,
    image:{
        custom: {
            options: (value, { req }) => {
                if(!req.files || !req.files.image){
                    return true;
                }
                const { image } = req.files;
                if(image.name && imageExtensions.filter(ext => image.name.includes(ext)).length > 0){
                    return true;
                }
                throw new Error(`image must be a file with specified extensions ${imageExtensions.join(", ")}`);
            }
        }
    }
});

export const deleteTourBaseValidation = checkSchema({
    id: {
        in: ["params"],
        custom: isValidMongooseId
    }
});