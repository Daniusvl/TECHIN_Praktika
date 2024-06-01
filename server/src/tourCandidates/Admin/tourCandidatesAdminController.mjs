import { tourCandidatesAdminService } from "./tourCandidatesAdminService.mjs";

export const tourCandidatesAdminController = {
    getAllActiveTourCandidates: async (req, res, next) => {
        try {
            const {statusCode, data} = await tourCandidatesAdminService.getAllActiveTourCandidates(req.params.page);
            return res.status(statusCode).json(data);
        } catch (error) {
            next(error);
        }
    },

    getAllHistoryTourCandidates: async (req, res, next) => {
        try {
            const {statusCode, data} = await tourCandidatesAdminService.getAllHistoryTourCandidates(req.params.page);
            return res.status(statusCode).json(data);
        } catch (error) {
            next(error);
        }
    },

    approveTourCandidate: async (req, res, next) => {
        try {
            const {statusCode, data} = await tourCandidatesAdminService.approveTourCandidate(req.params.tourCandidateId);
            return res.status(statusCode).json(data);
        } catch (error) {
            next(error);
        }
    },

    rejectTourCandidate: async (req, res, next) => {
        try {
            const {statusCode, data} = await tourCandidatesAdminService.rejectTourCandidate(req.body);
            return res.status(statusCode).json(data);
        } catch (error) {
            next(error);
        }
    }
};