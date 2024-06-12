import { apiClient, modelResponse } from "./base.mjs";

export const tourDates ={
    getDates: async (tourId) => {
        try {
            const response = await apiClient.get(`/toursInstance/${tourId}`);
            return modelResponse(response.status, response.data);
        } catch (error) {
            return modelResponse(error.response.status, error.response.data);
        }
    },
    createDate: async (body) => {
        try {
            const response = await apiClient.post("/toursInstance/", body);
            return modelResponse(response.status, response.data);
        } catch (error) {
            return modelResponse(error.response.status, error.response.data);
        }
    },
    deleteDate: async (id) => {
        try {
            const response = await apiClient.delete(`/toursInstance/${id}`);
            return modelResponse(response.status, response.data);
        } catch (error) {
            return modelResponse(error.response.status, error.response.data);
        }
    }
};