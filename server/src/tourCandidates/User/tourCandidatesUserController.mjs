import { tourCandidatesUserService } from "./tourCandidatesUserService.mjs";

export const tourCandidatesUserController = {
    createTourCandidate: async (req, res, next) => {
        try {
            const {statusCode, data} = await tourCandidatesUserService.createTourCandidate(req.user, req.params.tourInstanceId);
            return res.status(statusCode).json(data);
        } catch (error) {
            next(error);
        }
    },

    deleteTourCandidate: async (req, res, next) => {
        try {
            const {statusCode, data} = await tourCandidatesUserService.deleteTourCandidate(req.user, req.params.id);
            return res.status(statusCode).json(data);
        } catch (error) {
            next(error);
        }
    },

    changeTourInstance: async (req, res, next) => {
        try {
            const {statusCode, data} = await tourCandidatesUserService.changeTourInstance(req.user, req.body);
            return res.status(statusCode).json(data);
        } catch (error) {
            next(error);
        }
    },

    leaveReview: async (req, res, next) => {
        try {
            const {statusCode, data} = await tourCandidatesUserService.leaveReview(req.user, req.body);
            return res.status(statusCode).json(data);
        } catch (error) {
            next(error);
        }
    },

    getMyActiveTourCandidates: async (req, res, next) => {
        try {
            const {statusCode, data} = await tourCandidatesUserService.getMyActiveTourCandidates(req.user);
            return res.status(statusCode).json(data);
        } catch (error) {
            next(error);
        }
    },

    getMyHistoryTourCandidates: async (req, res, next) => {
        try {
            const {statusCode, data} = await tourCandidatesUserService.getMyHistoryTourCandidates(req.user, req.params.page);
            return res.status(statusCode).json(data);
        } catch (error) {
            next(error);
        }
    }
};