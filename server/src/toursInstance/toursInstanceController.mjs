import { toursInstanceService } from "./toursInstanceService.mjs";

export const toursInstanceController = {
    createTourInstance: async (req, res, next) => {
        try {
            const {statusCode, data} = await toursInstanceService.createTourInstance(req.body);
            return res.status(statusCode).json(data);
        } catch (error) {
            next(error);
        }
    },

    deleteTourInstance: async (req, res, next) => {
        try {
            const {statusCode, data} = await toursInstanceService.deleteTourInstance(req.body);
            return res.status(statusCode).json(data);
        } catch (error) {
            next(error);
        }
    },

    getAllUpcomingTourBaseTourInstances: async (req, res, next) => {
        try {
            const {statusCode, data} = await toursInstanceService.getAllUpcomingTourBaseTourInstances(req.params.tourBaseId);
            return res.status(statusCode).json(data);
        } catch (error) {
            next(error);
        }
    }
};