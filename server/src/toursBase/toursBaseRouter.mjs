import express from "express";

import { toursBaseController } from "./toursBaseController.mjs";

export const toursBaseRouter = express.Router();

toursBaseRouter.post("/", toursBaseController.createTourBase);