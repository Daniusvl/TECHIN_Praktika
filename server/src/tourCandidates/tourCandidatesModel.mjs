import { Schema, model, Types } from "mongoose";
import { PROCESSING, STATUSES } from "../shared/config/tourCandidates.mjs";

const tourCandidatesModel = Schema(
    {
        score: { type:Number },
        review: { type: String },
        status: { type: String, enum: STATUSES, required: true, default: PROCESSING },
        statusMessage: { type: String },
        tourInstance: {type: Types.ObjectId, ref: "TourInstance", required: true},
        user: {type: Types.ObjectId, ref: "User", required: true},
    },
    { 
        versionKey: false,
        id: false
    }
);

export default model("TourCandidate", tourCandidatesModel, "TourCandidates");