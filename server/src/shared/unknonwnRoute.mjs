import { responseMessage } from "./responseMessage.mjs";

export const unknownRoute = (req, res) => {
    return res.status(404).json(responseMessage("Unknown route"));
};