import { toursBaseService } from "./toursBaseService.mjs";

export const toursBaseController = {
    createTourBase: async (req, res, nexxt) => {
        try {
            const {statusCode, data} = await toursBaseService.createTourBase(req.body, req.files);
            return res.status(statusCode).json(data);
        } catch (error) {
            nexxt(error);
        }
    }
};