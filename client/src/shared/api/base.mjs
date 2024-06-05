import axios from "axios";

export const BASE_URL = "http://localhost:1234/";

const BASE_API_URL = `${BASE_URL }api`;

export const modelResponse = (status, data) => {
    return {status, data};
};

export const apiClient = axios.create({
    baseURL: BASE_API_URL
});