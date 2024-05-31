import express from "express";

import { toursInstanceController } from "./toursInstanceController.mjs";
import { authMiddleware } from "../shared/middleware/authMiddleware.mjs";
import { ADMIN } from "../shared/config/UserRoles.mjs";
import { createTourInstanceValidation, deleteTourInstanceValidation } from "./toursInstanceValidator.mjs";
import { validationMiddleware } from "../shared/middleware/validationMiddleware.mjs";

export const toursInstanceRouter = express.Router();

toursInstanceRouter.post("/", [authMiddleware(ADMIN), createTourInstanceValidation, validationMiddleware], toursInstanceController.createTourInstance);
toursInstanceRouter.delete("/", [authMiddleware(ADMIN), deleteTourInstanceValidation, validationMiddleware], toursInstanceController.deleteTourInstance);