import toursInstanceModel from "./toursInstanceModel.mjs";
import { serviceResponse } from "../shared/serviceResponse.mjs";
import { responseMessage } from "../shared/responseMessage.mjs";
import { toursBaseService, TOUR_NOT_FOUND } from "../toursBase/index.mjs";
import { SUCCESS } from "../shared/commonResponseMessages.mjs";

const TOUR_DATE_ALREADY_EXISTS = responseMessage("This tour already contains this date");

const TOUR_DATE_NOT_FOUND = responseMessage("Tour with specified start date not found");

export const toursInstanceService = {
    createTourInstance: async (data) => {
        const {tourBaseId, startDate} = data;

        const {statusCode, data: tourBase} = await toursBaseService.getTourBaseById(tourBaseId);

        if(statusCode !== 200){
            return serviceResponse(404, TOUR_NOT_FOUND);
        }

        const doesExist = await toursInstanceModel.findOne({tourBase: tourBase._id, startDate});
        if(doesExist){
            return serviceResponse(409, TOUR_DATE_ALREADY_EXISTS);
        }

        const tourInstance = {
            tourBase: tourBase._id,
            startDate
        };

        const result = await toursInstanceModel.create(tourInstance);

        return serviceResponse(201, result);
    },

    deleteTourInstance: async (data) => {
        const {tourBaseId, startDate} = data;

        const {statusCode, data: tourBase} = await toursBaseService.getTourBaseById(tourBaseId);

        if(statusCode !== 200){
            return serviceResponse(404, TOUR_NOT_FOUND);
        }

        const tourInstance = await toursInstanceModel.findOneAndDelete({tourBase: tourBase._id, startDate});

        if(!tourInstance){
            return serviceResponse(404, TOUR_DATE_NOT_FOUND);
        }

        return serviceResponse(200, SUCCESS);
    },

    deleteAllTourInstances: async (tourBaseId) => {
        const {statusCode, data: tourBase} = await toursBaseService.getTourBaseById(tourBaseId);

        if(statusCode !== 200){
            return serviceResponse(404, TOUR_NOT_FOUND);
        }
        
        await toursInstanceModel.deleteMany({tourBase: tourBase._id});

        return serviceResponse(200, SUCCESS);
    }
};