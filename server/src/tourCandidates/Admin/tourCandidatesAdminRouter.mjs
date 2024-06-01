import express from "express";

import { tourCandidatesAdminController } from "./tourCandidatesAdminController.mjs";
import { validationMiddleware } from "../../shared/middleware/validationMiddleware.mjs";
import { getAllActiveTourCandidatesValidator, getAllHistoryTourCandidatesValidator,
    approveTourCandidateValidator, rejectTourCandidateValidator
} from "./tourCandidatesAdminValidator.mjs";

export const tourCandidatesAdminRouter = express.Router();

tourCandidatesAdminRouter.get("/active/:page", [getAllActiveTourCandidatesValidator, validationMiddleware], tourCandidatesAdminController.getAllActiveTourCandidates);
tourCandidatesAdminRouter.get("/history/:page", [getAllHistoryTourCandidatesValidator, validationMiddleware], tourCandidatesAdminController.getAllHistoryTourCandidates);
tourCandidatesAdminRouter.put("/approve/:tourCandidateId", [approveTourCandidateValidator, validationMiddleware], tourCandidatesAdminController.approveTourCandidate);
tourCandidatesAdminRouter.put("/reject", [rejectTourCandidateValidator, validationMiddleware], tourCandidatesAdminController.rejectTourCandidate);