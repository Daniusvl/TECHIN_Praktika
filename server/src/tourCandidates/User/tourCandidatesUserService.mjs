import tourCandidatesModel from "../tourCandidatesModel.mjs";
import { serviceResponse } from "../../shared/serviceResponse.mjs";
import { responseMessage } from "../../shared/responseMessage.mjs";
import { SUCCESS } from "../../shared/commonResponseMessages.mjs";
import { toursInstanceService } from "../../toursInstance/index.mjs";
import { APPROVED, PROCESSING, maxActiveTourCandidatesForOneUser, historyPageItemCount } from "../../shared/config/tourCandidates.mjs";

const DATE_NOT_FOUND = responseMessage("Tour with specified date does not exist");

const TOUR_CANDIDATE_NOT_FOUND = responseMessage("Tour candidate not found");

const NOT_APPROVED = responseMessage("You cannot perform this action because the tour request was not approved yet");

const DATE_DOES_NOT_EXIST_IN_TOUR = responseMessage("Date provided does not exist in the tour");

const CANNOT_LEAVE_REVIEW = responseMessage("You cannot leave a review if a tour did not start yet");

const CANNOT_PERFOMR_ACTION_FOR_PAST_TOUR_DATE = responseMessage("You cannot apply/modify your request for tour that went in the past");

const ALREADY_EXISTS = responseMessage("You already applied for this date of the tour");

const MAX_COUNT_REACHED = responseMessage(`You exceeded your maximum allowed active tour requests (${maxActiveTourCandidatesForOneUser})`);

export const tourCandidatesUserService = {
    getMyActiveTourCandidates: async (user) => {
        const tourCandidates = await tourCandidatesModel.aggregate([
            {
                $match: { user: user._id }
            },
            {
                $lookup: {
                    from: "ToursInstance",
                    localField: "tourInstance",
                    foreignField: "_id",
                    as: "tourInstance",
                    pipeline: [
                        {
                            $match: { 
                                startDate: { $gte: new Date() }
                            }
                        },
                        {
                            $lookup: {
                                from: "ToursBase",
                                localField: "tourBase",
                                foreignField: "_id",
                                as: "tourBase"
                            }
                        },
                        {
                            $unwind: "$tourBase"
                        }
                    ]
                }
            },
            {
                $unwind: "$tourInstance"
            },
        ]);

        return serviceResponse(200, tourCandidates);
    },

    getMyHistoryTourCandidates: async (user, page) => {
        const pipelineResult = await tourCandidatesModel.aggregate([
            {
                $match: { user: user._id }
            },
            {
                $lookup: {
                    from: "ToursInstance",
                    localField: "tourInstance",
                    foreignField: "_id",
                    as: "tourInstance",
                    pipeline: [
                        {
                            $match: { 
                                startDate: { $lt: new Date() }
                            }
                        },
                        {
                            $lookup: {
                                from: "ToursBase",
                                localField: "tourBase",
                                foreignField: "_id",
                                as: "tourBase"
                            }
                        },
                        {
                            $unwind: "$tourBase"
                        }
                    ]
                }
            },
            {
                $unwind: "$tourInstance"
            },
            {
                $facet: {
                    data: [
                        {
                            $skip: historyPageItemCount*page-historyPageItemCount
                        },
                        {
                            $limit: historyPageItemCount
                        }
                    ],
                    totalCount: [
                        { $count: "count" }
                    ]
                }
            },
            {
                $project: {
                    data: 1,
                    pageCount: { $arrayElemAt: ["$totalCount.count", 0] }
                }
            },
            
        ]);
        
        const tourCandidates = pipelineResult[0];

        tourCandidates.pageCount = Math.ceil(tourCandidates.pageCount / historyPageItemCount);

        return serviceResponse(200, tourCandidates);
    },

    createTourCandidate: async (user, tourInstanceId) => {
        const { statusCode: tourInstanceStatusCode, data: tourInstance } = await toursInstanceService.getTourInstanceById(tourInstanceId);

        if(tourInstanceStatusCode !== 200){
            return serviceResponse(404, DATE_NOT_FOUND);
        }

        const exists = await tourCandidatesModel.findOne({user: user._id, tourInstance: tourInstanceId});

        if(exists){
            return serviceResponse(400, ALREADY_EXISTS);
        }

        const {data: {length: tourCandidatesCount}} = await tourCandidatesUserService.getMyActiveTourCandidates(user);

        if(tourCandidatesCount >= maxActiveTourCandidatesForOneUser){
            return serviceResponse(409, MAX_COUNT_REACHED);
        }

        const tourCandidate = {
            user: user._id,
            tourInstance: tourInstanceId
        };
        
        if(tourInstance.startDate < new Date()){
            return serviceResponse(400, CANNOT_PERFOMR_ACTION_FOR_PAST_TOUR_DATE);
        }

        const result = await tourCandidatesModel.create(tourCandidate);

        return serviceResponse(201, result);
    },
    
    deleteTourCandidate: async (user, id) => {
        const result = await tourCandidatesModel.findOne({_id: id, user: user._id});

        if(!result){
            return serviceResponse(404, TOUR_CANDIDATE_NOT_FOUND);
        }

        const { statusCode, data: tourInstance } = await toursInstanceService.getTourInstanceById(result.tourInstance);

        if(statusCode !== 200){
            return serviceResponse(404, DATE_NOT_FOUND);
        }

        if(tourInstance.startDate < new Date()){
            return serviceResponse(400, CANNOT_PERFOMR_ACTION_FOR_PAST_TOUR_DATE);
        }

        await tourCandidatesModel.findOneAndDelete(result);

        return serviceResponse(200, SUCCESS);
    },

    changeTourInstance: async (user, data) => {
        const { tourCandidateId, tourInstanceId } = data;

        const tourCandidate = await tourCandidatesModel.findOne({_id: tourCandidateId, user: user._id});

        if(!tourCandidate){
            return serviceResponse(404, TOUR_CANDIDATE_NOT_FOUND);
        }

        const { data: oldTourInstance } = await toursInstanceService.getTourInstanceById(tourCandidate.tourInstance);

        if(oldTourInstance.startDate < new Date()){
            return serviceResponse(400, CANNOT_PERFOMR_ACTION_FOR_PAST_TOUR_DATE);
        }

        const { statusCode: newStatusCode, data: newTourInstance } = await toursInstanceService.getTourInstanceById(tourInstanceId);

        if(newStatusCode !== 200){
            return serviceResponse(404, DATE_NOT_FOUND);
        }

        if(!oldTourInstance.tourBase.equals(newTourInstance.tourBase)){
            return serviceResponse(400, DATE_DOES_NOT_EXIST_IN_TOUR);
        }

        tourCandidate.tourInstance = newTourInstance._id;
        tourCandidate.status = PROCESSING;
        await tourCandidate.save();

        return serviceResponse(200, tourCandidate);
    },

    leaveReview: async (user, data) => {
        const { tourCandidateId, score, review } = data;

        const tourCandidate = await tourCandidatesModel.findOne({_id: tourCandidateId, user: user._id});

        if(!tourCandidate){
            return serviceResponse(404, TOUR_CANDIDATE_NOT_FOUND);
        }

        if(tourCandidate.status !== APPROVED){
            return serviceResponse(403, NOT_APPROVED);
        }

        const { statusCode, data: tourInstance } = await toursInstanceService.getTourInstanceById(tourCandidate.tourInstance);

        if(statusCode !== 200){
            return serviceResponse(404, DATE_NOT_FOUND);
        }

        if(tourInstance.startDate > new Date()){
            return serviceResponse(400, CANNOT_LEAVE_REVIEW);
        }

        tourCandidate.score = score;
        tourCandidate.review = review;
        await tourCandidate.save();

        return serviceResponse(200, tourCandidate);
    }
};