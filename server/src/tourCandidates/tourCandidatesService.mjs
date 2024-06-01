import { serviceResponse } from "../shared/serviceResponse.mjs";
import tourCandidatesModel from "./tourCandidatesModel.mjs";
import { SUCCESS } from "../shared/commonResponseMessages.mjs";

export const tourCandidatesService = {
    deleteAllWithMatchTourInstance: async (tourInstancesIds) => {
        await tourCandidatesModel.deleteMany({tourInstance: {$in: tourInstancesIds}});

        return serviceResponse(200, SUCCESS);
    }
};