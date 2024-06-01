import express from "express";

import { tourCandidatesUserRouter } from "./User/tourCandidatesUserRouter.mjs";
import { authMiddleware } from "../shared/middleware/authMiddleware.mjs";
import { ADMIN, USER } from "../shared/config/UserRoles.mjs";
import { tourCandidatesAdminRouter } from "./Admin/tourCandidatesAdminRouter.mjs";

export const tourCandidatesRouter = express.Router();

tourCandidatesRouter.use("/user", authMiddleware(USER), tourCandidatesUserRouter);
tourCandidatesRouter.use("/admin", authMiddleware(ADMIN), tourCandidatesAdminRouter);