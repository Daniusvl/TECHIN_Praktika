import tourCandidatesModel from "../tourCandidatesModel.mjs";
import { serviceResponse } from "../../shared/serviceResponse.mjs";
import { responseMessage } from "../../shared/responseMessage.mjs";
import { adminActivePageItemCount, adminHistoryPageItemCount, APPROVED, REJECTED } from "../../shared/config/tourCandidates.mjs";
import { generateTourCandidatesPipeline } from "./tourCandidatesPipeline.mjs";

const TOUR_CANDIDATE_NOT_FOUND = responseMessage("Tour candidate not found");

const CANNOT_MODIFY_STATUS = responseMessage("Cannot modify requests of tours which have already taken place");

const SINGLE_TOUR_ALREADY_FILLED = responseMessage("This tour is single and for this date candidate was already filled");

export const tourCandidatesAdminService = {
    getAllActiveTourCandidates: async (page) => {
        const pipelineResult = await tourCandidatesModel.aggregate(
            generateTourCandidatesPipeline({$gte: new Date()}, page, adminActivePageItemCount));

        const data = pipelineResult[0];
        data.pageCount = Math.ceil(data.pageCount / adminActivePageItemCount);
        return serviceResponse(200, data);
    },

    getAllHistoryTourCandidates: async (page) => {
        const pipelineResult = await tourCandidatesModel.aggregate(
            generateTourCandidatesPipeline({$lt: new Date()}, page, adminHistoryPageItemCount));

        const data = pipelineResult[0];
        data.pageCount = Math.ceil(data.pageCount / adminHistoryPageItemCount);
        return serviceResponse(200, data);
    },

    approveTourCandidate: async (tourCandidateId) => {
        const tourCandidate = await tourCandidatesModel.findOne({_id: tourCandidateId})
            .populate({
                path: "tourInstance",
                populate: {
                    path: "tourBase"
                }
            }).exec();

        if(!tourCandidate){
            return serviceResponse(404, TOUR_CANDIDATE_NOT_FOUND);
        }

        if(tourCandidate.tourInstance.startDate < new Date()){
            return serviceResponse(400, CANNOT_MODIFY_STATUS);
        }

        if(tourCandidate.tourInstance.tourBase.isSingle){
            const exists = await tourCandidatesModel.findOne({_id: tourCandidateId, status: APPROVED});
            if(exists){
                return serviceResponse(400, SINGLE_TOUR_ALREADY_FILLED);
            }
        }

        tourCandidate.status = APPROVED;
        tourCandidate.statusMessage = "";
        await tourCandidate.save();

        return serviceResponse(200, tourCandidate);
    },  

    rejectTourCandidate: async (data) => {
        const {tourCandidateId, statusMessage} = data;

        const tourCandidate = await tourCandidatesModel.findOne({_id: tourCandidateId})
            .populate({
                path: "tourInstance",
                populate: {
                    path: "tourBase"
                }
            }).exec();

        if(!tourCandidate){
            return serviceResponse(404, TOUR_CANDIDATE_NOT_FOUND);
        }

        if(tourCandidate.tourInstance.startDate < new Date()){
            return serviceResponse(400, CANNOT_MODIFY_STATUS);
        }

        tourCandidate.status = REJECTED;
        tourCandidate.statusMessage = statusMessage;
        await tourCandidate.save();

        return serviceResponse(200, tourCandidate);
    },
};