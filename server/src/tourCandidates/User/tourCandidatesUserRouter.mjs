import express from "express";

import { tourCandidatesUserController } from "./tourCandidatesUserController.mjs";
import { changeTourInstanceValdiation, createTourCandidateValidation, 
    deleteTourCandidateValdiation, leaveReviewValidation, getMyHistoryTourCandidatesValidation } from "./tourCandidatesUserValidator.mjs";
import { validationMiddleware } from "../../shared/middleware/validationMiddleware.mjs";

export const tourCandidatesUserRouter = express.Router();

tourCandidatesUserRouter.get("/active", tourCandidatesUserController.getMyActiveTourCandidates);
tourCandidatesUserRouter.get("/history/:page", [getMyHistoryTourCandidatesValidation, validationMiddleware], tourCandidatesUserController.getMyHistoryTourCandidates);
tourCandidatesUserRouter.post("/:tourInstanceId", [createTourCandidateValidation, validationMiddleware], tourCandidatesUserController.createTourCandidate);
tourCandidatesUserRouter.delete("/:id", [deleteTourCandidateValdiation, validationMiddleware], tourCandidatesUserController.deleteTourCandidate);
tourCandidatesUserRouter.put("/changeDate", [changeTourInstanceValdiation, validationMiddleware], tourCandidatesUserController.changeTourInstance);
tourCandidatesUserRouter.put("/review", [leaveReviewValidation, validationMiddleware], tourCandidatesUserController.leaveReview);