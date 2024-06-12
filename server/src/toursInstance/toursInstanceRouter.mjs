import express from "express";

import { toursInstanceController } from "./toursInstanceController.mjs";
import { authMiddleware } from "../shared/middleware/authMiddleware.mjs";
import { ADMIN } from "../shared/config/UserRoles.mjs";
import { createTourInstanceValidation, deleteTourInstanceValidation, getAllUpcomingTourBaseTourInstancesValidation } from "./toursInstanceValidator.mjs";
import { validationMiddleware } from "../shared/middleware/validationMiddleware.mjs";

export const toursInstanceRouter = express.Router();

toursInstanceRouter.post("/", [authMiddleware(ADMIN), createTourInstanceValidation, validationMiddleware], toursInstanceController.createTourInstance);
toursInstanceRouter.delete("/:id", [authMiddleware(ADMIN), deleteTourInstanceValidation, validationMiddleware], toursInstanceController.deleteTourInstance);
toursInstanceRouter.get("/:tourBaseId", [getAllUpcomingTourBaseTourInstancesValidation, validationMiddleware], toursInstanceController.getAllUpcomingTourBaseTourInstances);