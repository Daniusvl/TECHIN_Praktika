import toursBaseModel from "./toursBaseModel.mjs";
import { serviceResponse } from "../shared/serviceResponse.mjs";
import { responseMessage } from "../shared/responseMessage.mjs";
import { WriteFile } from "../shared/imageHandler.mjs";

const NAME_ALREADY_TAKEN = responseMessage("Name already taken");

const FAILED_TO_UPLOAD_FILE = responseMessage("Failed to upload file to the server");

export const toursBaseService = {
    createTourBase: async (data, files) => {
        const { name, durationInHours, description, price, isSingle } = data;

        const doesExist = await toursBaseModel.findOne({name});

        if(doesExist){
            return serviceResponse(409, NAME_ALREADY_TAKEN);
        }

        const {image} = files;
        
        let imgPath;
        try {
            imgPath = await WriteFile(image);
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            return responseMessage(500, FAILED_TO_UPLOAD_FILE);
        }

        const tourBase = {
            name,
            durationInHours,
            description,
            price,
            isSingle,
            imgPath
        };

        const result = await toursBaseModel.create(tourBase);

        return serviceResponse(201, result);
    }
};