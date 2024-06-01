import express from "express";

import { tourCandidatesUserRouter } from "./User/tourCandidatesUserRouter.mjs";
import { authMiddleware } from "../shared/middleware/authMiddleware.mjs";
import { USER } from "../shared/config/UserRoles.mjs";

export const tourCandidatesRouter = express.Router();

tourCandidatesRouter.use("/user", authMiddleware(USER), tourCandidatesUserRouter);