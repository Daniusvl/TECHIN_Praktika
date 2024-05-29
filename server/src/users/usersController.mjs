import { usersService } from "./usersService.mjs";

export const usersController = {
    createUser: async (req, res, next) => {
        try {
            const {statusCode, data} = await usersService.createUser(req.body);
            return res.status(statusCode).json(data);
        } catch (error) {
            next(error);
        }
    },

    loginUser: async (req, res, next) => {
        try {
            const {statusCode, data} = await usersService.loginUser(req.body);
            return res.status(statusCode).json(data);
        } catch (error) {
            next(error);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const {statusCode, data} = await usersService.getUserById(req.params.id);
            return res.status(statusCode).json(data);
        } catch (error) {
            next(error);
        }
    }
};