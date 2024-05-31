import { Schema, model, Types } from "mongoose";

const toursInstanceModel = Schema(
    {
        tourBase: {type: Types.ObjectId, ref: "TourBase", required: true},
        startDate: {type: Date, required: true}
    },
    {
        versionKey: false,
        id: false
    }
);

export default model("TourInstance", toursInstanceModel, "ToursInstance");