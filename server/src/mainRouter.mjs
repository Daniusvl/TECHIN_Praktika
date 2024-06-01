import express from "express";
import { usersRouter } from "./users/index.mjs";
import { toursBaseRouter } from "./toursBase/index.mjs";
import { toursInstanceRouter } from "./toursInstance/index.mjs";
import { tourCandidatesRouter } from "./tourCandidates/index.mjs";

const router = express.Router();

/**
 *  @swagger
 *  components:
 *      securitySchemes:
 *              bearerAuth:
 *                  type: http
 *                  scheme: bearer
 *                  bearerFormat: JWT
 *      schemas:
 *          Validation:
 *              type: object
 *              properties:
 *                  errors:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              type: string
 *                              value: string
 *                              msg: string
 *                              path: string
 *                              location: string
 *              example:
 *                  errors:
 *                    - type: field
 *                      value: someValue
 *                      msg: someValue must be a valid email
 *                      path: email
 *                      location: body
 *                    - type: field
 *                      value: someValue
 *                      msg: someValue must be a valid password
 *                      path: password
 *                      location: body
 *          Error:
 *              type: object
 *              properties:
 *                  message: 
 *                      type: string
 *              example: 
 *                  message: Server side error
 */

router.use("/users", usersRouter);

router.use("/toursBase", toursBaseRouter);

router.use("/toursInstance", toursInstanceRouter);

router.use("/tourCandidates", tourCandidatesRouter);

export default router;