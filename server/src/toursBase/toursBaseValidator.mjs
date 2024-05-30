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
            if (price < 0 || price > 100000) {
                throw new Error("Price must be between 0 and 100000");
            }
            return true;
        }
    }
};

const durationInHoursValidation = 
{
    isNumeric: {
        errorMessage: "duration must be a valid number"
    },
    custom: {
        options: (value) => {
            const duration = parseFloat(value);
            if (duration < 1 || duration > 24*7) {
                throw new Error(`Duration must be between 1 and ${24*7}`);
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