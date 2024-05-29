import axios from "axios";

const BASE_URL = "http://localhost:1234/api";

export const modelResponse = (status, data) => {
    return {status, data};
};

export const apiClient = axios.create({
    baseURL: BASE_URL
});