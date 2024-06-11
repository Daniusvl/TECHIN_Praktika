import { apiClient, modelResponse } from "./base.mjs";

export const tourDates ={
    getDates: async (tourId) => {
        try {
            const response = await apiClient.get(`/toursInstance/${tourId}`);
            return modelResponse(response.status, response.data);
        } catch (error) {
            return modelResponse(error.response.status, error.response.data);
        }
    }
};