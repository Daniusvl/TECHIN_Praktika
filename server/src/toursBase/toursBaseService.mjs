import toursBaseModel from "./toursBaseModel.mjs";
import { serviceResponse } from "../shared/serviceResponse.mjs";
import { responseMessage } from "../shared/responseMessage.mjs";
import { updateFile, writeFile, deleteFile } from "../shared/imageHandler.mjs";
import { SUCCESS } from "../shared/commonResponseMessages.mjs";
import { toursInstanceService } from "../toursInstance/index.mjs";
import { mainTourPageItemCount } from "../shared/config/tourCandidates.mjs";
import { getSearchPipeline, getByIdPipeline } from "./toursBasePipelines.mjs";

const NAME_ALREADY_TAKEN = responseMessage("Name already taken");

const FAILED_TO_UPLOAD_FILE = responseMessage("Failed to upload file to the server");

export const TOUR_NOT_FOUND = responseMessage("Tour with specified id not found");

export const toursBaseService = {
    getToursBase: async (args, page) => {
        const pipelineResult = await toursBaseModel.aggregate(getSearchPipeline(args, page));
        const maxPriceAndMaxDuraiton = await toursBaseModel.aggregate([
            {
                $group : { 
                    _id: null, 
                    maxPrice: { 
                        $max : "$price" 
                    },
                    maxDuration:{
                        $max : "$durationInHours"
                    }
                }
            }
        ]);

        const data = pipelineResult[0];
        data.maxPrice = maxPriceAndMaxDuraiton[0].maxPrice;
        data.maxDuration = maxPriceAndMaxDuraiton[0].maxDuration;
        data.pageCount = Math.ceil(data.pageCount / mainTourPageItemCount);

        return serviceResponse(200, data);
    },

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

        const { statusCode } = await toursInstanceService.deleteAllTourInstances(id);

        if(statusCode !== 200){
            return serviceResponse(404, TOUR_NOT_FOUND);
        }

        const tourBase = await toursBaseModel.findOneAndDelete({_id: id});

        if(!tourBase){
            return serviceResponse(404, TOUR_NOT_FOUND);
        }

        await deleteFile(tourBase.imgPath);

        return serviceResponse(200, SUCCESS);
    },

    getTourBaseById: async (id) => {
        const pipeline = await toursBaseModel.aggregate(getByIdPipeline(id));

        const tourBase = pipeline[0];

        if(!tourBase){
            return serviceResponse(404, TOUR_NOT_FOUND);
        }

        return serviceResponse(200, tourBase);
    }
};