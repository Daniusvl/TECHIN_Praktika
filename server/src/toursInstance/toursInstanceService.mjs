import toursInstanceModel from "./toursInstanceModel.mjs";
import { serviceResponse } from "../shared/serviceResponse.mjs";
import { responseMessage } from "../shared/responseMessage.mjs";
import { toursBaseService, TOUR_NOT_FOUND } from "../toursBase/index.mjs";
import { SUCCESS } from "../shared/commonResponseMessages.mjs";
import { tourCandidatesService } from "../tourCandidates/index.mjs";

const TOUR_DATE_ALREADY_EXISTS = responseMessage("This tour already contains this date");

export const TOUR_DATE_NOT_FOUND = responseMessage("Tour with specified start date not found");

const NOT_FOUND = responseMessage("Tour instance not found");

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

    deleteTourInstance: async (id) => {
        const tourInstance = await toursInstanceModel.findOneAndDelete({_id: id});

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
        
        const tourInstances = await toursInstanceModel.find({tourBase: tourBase._id});

        await tourCandidatesService.deleteAllWithMatchTourInstance(tourInstances.map(obj => obj._id));

        await toursInstanceModel.deleteMany({tourBase: tourBase._id});

        return serviceResponse(200, SUCCESS);
    },

    getTourInstanceById: async (id) => {
        const tourInstance = await toursInstanceModel.findById(id);

        if(!tourInstance){
            return serviceResponse(404, NOT_FOUND);
        }

        return serviceResponse(200, tourInstance);
    },

    getAllUpcomingTourBaseTourInstances: async (tourBaseId) => {
        const {statusCode, data: tourBase} = await toursBaseService.getTourBaseById(tourBaseId);

        if(statusCode !== 200){
            return serviceResponse(404, TOUR_NOT_FOUND);
        }

        const result = await toursInstanceModel.find({tourBase: tourBase._id, startDate: {$gt: new Date()}});

        return serviceResponse(200, result);
    }
};