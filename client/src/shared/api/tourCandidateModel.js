import { apiClient, modelResponse } from "./base.mjs";

export const tourCandidateModel ={
    apply: async (id) => {
        try {
            const response = await apiClient.post(`/tourCandidates/user/${id}`);
            return modelResponse(response.status, response.data);
        } catch (error) {
            return modelResponse(error.response.status, error.response.data);
        }
    },
    showAllActiveRequests: async (page) => {
        try {
            const response = await apiClient.get(`/tourCandidates/admin/active/${page}`);
            return modelResponse(response.status, response.data);
        } catch (error) {
            return modelResponse(error.response.status, error.response.data);
        }
    },
    showAllHistoryRequests: async (page) => {
        try {
            const response = await apiClient.get(`/tourCandidates/admin/history/${page}`);
            return modelResponse(response.status, response.data);
        } catch (error) {
            return modelResponse(error.response.status, error.response.data);
        }
    },
    approveRequest: async (id) => {
        try {
            const response = await apiClient.put(`/tourCandidates/admin/approve/${id}`);
            return modelResponse(response.status, response.data);
        } catch (error) {
            return modelResponse(error.response.status, error.response.data);
        }
    },
    rejectRequest: async (body) => {
        try {
            const response = await apiClient.put("/tourCandidates/admin/reject", body);
            return modelResponse(response.status, response.data);
        } catch (error) {
            return modelResponse(error.response.status, error.response.data);
        }
    },
    showMyActiveRequests: async () => {
        try {
            const response = await apiClient.get("/tourCandidates/user/active/");
            return modelResponse(response.status, response.data);
        } catch (error) {
            return modelResponse(error.response.status, error.response.data);
        }
    },
    showMyHistoryRequests: async (page) => {
        try {
            const response = await apiClient.get(`/tourCandidates/user/history/${page}`);
            return modelResponse(response.status, response.data);
        } catch (error) {
            return modelResponse(error.response.status, error.response.data);
        }
    },
    leaveReview: async (body) => {
        try {
            const response = await apiClient.put("/tourCandidates/user/review", body);
            return modelResponse(response.status, response.data);
        } catch (error) {
            return modelResponse(error.response.status, error.response.data);
        }
    },
    cancelRequest: async (id) => {
        try {
            const response = await apiClient.delete(`/tourCandidates/user/${id}`);
            return modelResponse(response.status, response.data);
        } catch (error) {
            return modelResponse(error.response.status, error.response.data);
        }
    },
    changeDate: async (body) => {
        try {
            const response = await apiClient.put("/tourCandidates/user/changeDate", body);
            return modelResponse(response.status, response.data);
        } catch (error) {
            return modelResponse(error.response.status, error.response.data);
        }
    },
};