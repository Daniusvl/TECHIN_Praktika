import express from "express";
import "dotenv/config";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import mongoose from "mongoose";

import { swaggerDoc } from "./src/shared/config/swaggerDoc.mjs";
import router from "./src/mainRouter.mjs";
import { unknownRoute } from "./src/shared/unknonwnRoute.mjs";
import { errorHandlingMiddleware } from "./src/shared/middleware/errorHandlingMiddleware.mjs";
import fileUpload from "express-fileupload";
import { PUBLIC, createPhotosFolderIfNotExists } from "./src/shared/imageHandler.mjs";

/* global process */

const app = express();

const startServer = async () => {
    try {
        createPhotosFolderIfNotExists();

        await mongoose.connect(process.env.DB_CONNECTION_STRING);

        app.use(cors());

        app.use(express.json());
        
        app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

        app.use(fileUpload({
            limits: { fileSize: 50 * 1024 * 1024 },
        }));

        app.use(express.static(PUBLIC));

        app.use("/api", router);

        app.use("*", unknownRoute);
        
        app.use(errorHandlingMiddleware);

        const port = process.env.PORT || 3000;

        app.listen(port, () => {
            console.log(`Server is running and listening on port ${port}.`);
        });

    } catch (error) {
        console.error(error);

        process.exit(1);
    }
};

startServer();