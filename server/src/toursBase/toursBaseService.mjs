import toursBaseModel from "./toursBaseModel.mjs";
import { serviceResponse } from "../shared/serviceResponse.mjs";
import { responseMessage } from "../shared/responseMessage.mjs";
import { updateFile, writeFile, deleteFile } from "../shared/imageHandler.mjs";

const NAME_ALREADY_TAKEN = responseMessage("Name already taken");

const FAILED_TO_UPLOAD_FILE = responseMessage("Failed to upload file to the server");

const TOUR_NOT_FOUND = responseMessage("Tour with specified id not found");

const SUCCESS = responseMessage("Success");

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
            imgPath = await writeFile(image);
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            return serviceResponse(500, FAILED_TO_UPLOAD_FILE);
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
    },

    updateTourBase: async (data, files) => {
        const { _id, name, durationInHours, description, price, isSingle } = data;

        const tourBase = await toursBaseModel.findById(_id);

        if(!tourBase){
            return serviceResponse(404, TOUR_NOT_FOUND);
        }

        const doesExist = await toursBaseModel.findOne({name});

        if(doesExist && tourBase.name !== doesExist.name){
            return serviceResponse(409, NAME_ALREADY_TAKEN);
        }

        let imgPath = tourBase.imgPath;

        if(files && files.image){
            const {image} = files;
            try {
                imgPath = await updateFile(image, tourBase.imgPath);
                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                return serviceResponse(500, FAILED_TO_UPLOAD_FILE);
            }
        }

        tourBase.name = name;
        tourBase.durationInHours = durationInHours;
        tourBase.description = description;
        tourBase.price = price;
        tourBase.isSingle = isSingle;
        tourBase.imgPath = imgPath;
        await tourBase.save();

        return serviceResponse(200, tourBase);
    },

    deleteTourBase: async (id) => {
        const tourBase = await toursBaseModel.findOneAndDelete({_id: id});

        if(!tourBase){
            return serviceResponse(404, TOUR_NOT_FOUND);
        }

        try {
            await deleteFile(tourBase.imgPath);
        } catch (error) {
            console.log(`Database document ${tourBase} was deleted but ${tourBase.imgPath} delete failed: ${error}`);
        }

        return serviceResponse(200, SUCCESS);
    }
};