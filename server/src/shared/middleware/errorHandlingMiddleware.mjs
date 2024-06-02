import { responseMessage } from "../responseMessage.mjs";

const SERVER_SIDE_ERROR = responseMessage("Server side error");

/* eslint no-unused-vars: 'off' */
export const errorHandlingMiddleware = (error, req, res, next) => {

    console.error(error);
    
    res.status(500).json(SERVER_SIDE_ERROR);
};