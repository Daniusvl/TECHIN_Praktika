import { apiClient, modelResponse } from "./base.mjs";

export const tourCandidateModel ={
    apply: async (id) => {
        try {
            const response = await apiClient.post(`/tourCandidates/user/${id}`);
            return modelResponse(response.status, response.data);
        } catch (error) {
            return modelResponse(error.response.status, error.response.data);
        }
    }
};