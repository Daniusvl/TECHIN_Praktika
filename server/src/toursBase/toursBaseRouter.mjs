import express from "express";

import { toursBaseController } from "./toursBaseController.mjs";
import { authMiddleware } from "../shared/middleware/authMiddleware.mjs";
import { 
    createTourBaseValidation, deleteTourBaseValidation, 
    updateTourBaseValidation, getToursBaseValidator,
    getTourBaseByIdValidation } from "./toursBaseValidator.mjs";
import { ADMIN } from "../shared/config/UserRoles.mjs";
import { validationMiddleware } from "../shared/middleware/validationMiddleware.mjs";

export const toursBaseRouter = express.Router();

toursBaseRouter.get("/all/:page", [getToursBaseValidator, validationMiddleware], toursBaseController.getToursBase);
toursBaseRouter.get("/:id", [getTourBaseByIdValidation, validationMiddleware], toursBaseController.getTourBaseById);
toursBaseRouter.post("/", [authMiddleware(ADMIN), createTourBaseValidation, validationMiddleware], toursBaseController.createTourBase);
toursBaseRouter.put("/", [authMiddleware(ADMIN), updateTourBaseValidation, validationMiddleware], toursBaseController.updateTourBase);
toursBaseRouter.delete("/:id", [authMiddleware(ADMIN), deleteTourBaseValidation, validationMiddleware], toursBaseController.deleteTourBase);