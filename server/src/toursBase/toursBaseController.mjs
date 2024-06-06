import { toursBaseService } from "./toursBaseService.mjs";

export const toursBaseController = {
    getToursBase: async (req, res, next) => {
        try {
            const {statusCode, data} = await toursBaseService.getToursBase(req.query, req.params.page);
            return res.status(statusCode).json(data);
        } catch (error) {
            next(error);
        }
    },
    getTourBaseById: async (req, res, next) => {
        try {
            const {statusCode, data} = await toursBaseService.getTourBaseById(req.params.id);
            return res.status(statusCode).json(data);
        } catch (error) {
            next(error);
        }
    },
    createTourBase: async (req, res, next) => {
        try {
            const {statusCode, data} = await toursBaseService.createTourBase(req.body, req.files);
            return res.status(statusCode).json(data);
        } catch (error) {
            next(error);
        }
    },
    updateTourBase: async (req, res, next) => {
        try {
            const {statusCode, data} = await toursBaseService.updateTourBase(req.body, req.files);
            return res.status(statusCode).json(data);
        } catch (error) {
            next(error);
        }
    },
    deleteTourBase: async (req, res, next) => {
        try {
            const {statusCode, data} = await toursBaseService.deleteTourBase(req.params.id);
            return res.status(statusCode).json(data);
        } catch (error) {
            next(error);
        }
    }
};