import { Schema, model } from "mongoose";

const toursBaseModel = Schema(
    {
        name: { type: String, unique: true, required: true },
        imgPath: { type: String, required: true },
        durationInHours: { type: Number, required: true },
        description: { type: String, required: true },
        price: {
            type: Number,
            get: v => (v/100).toFixed(2),
            set: v => v*100
        },
        isSingle: { type: Boolean, required: true }
    },
    { 
        versionKey: false,
        toJSON: { getters: true },
        id: false
    }
);

export default model("TourBase", toursBaseModel, "ToursBase");