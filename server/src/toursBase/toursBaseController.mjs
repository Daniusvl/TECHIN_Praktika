import { toursBaseService } from "./toursBaseService.mjs";

export const toursBaseController = {
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
    }
};