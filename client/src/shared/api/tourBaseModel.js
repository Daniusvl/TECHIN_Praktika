import { apiClient, modelResponse } from "./base.mjs";

const generateQueryParams = (args) => {
    const {
        minPrice, maxPrice, priceFree,
        singleOnly, multipleOnly,
        minDuration, maxDuration,
        minScore, maxScore,
        searchNameQuery,
        sortBy, desc
    } = args;
    
    const mainArray = [];
    
    if("priceFree" in args){
        mainArray.push(["priceFree", priceFree]);
    }

    if("minPrice" in args && "maxPrice" in args){
        mainArray.push(["minPrice", minPrice]);
        mainArray.push(["maxPrice", maxPrice]);
    }
    
    if("singleOnly" in args || "multipleOnly" in args){
        mainArray.push(["singleOnly", singleOnly]);
        mainArray.push(["multipleOnly", multipleOnly]);
    }

    if("minDuration" in args && "maxDuration" in args){
        mainArray.push(["minDuration", minDuration]);
        mainArray.push(["maxDuration", maxDuration]);
    }

    if("minScore" in args && "maxScore" in args){
        mainArray.push(["minScore", minScore]);
        mainArray.push(["maxScore", maxScore]);
    }

    if("searchNameQuery" in args){
        mainArray.push(["searchNameQuery", searchNameQuery]);
    }

    if("sortBy" in args){
        mainArray.push(["sortBy", sortBy]);
    }

    if("desc" in args){
        mainArray.push(["desc", desc]);
    }

    return new URLSearchParams(mainArray);
};

let args = {};

export const setArgs = (newArgs) => {
    args = {...args, ...newArgs};
};

export const removeArgs = (...newArgs) => {
    for (let i = 0; i < newArgs.length; i++) {
        if(newArgs[i] in args){
            delete args[newArgs[i]];
        }
    }
};

export const tourBaseModel = {
    getTourBases: async (page) => {
        try {
            const response = await apiClient.get(`/toursBase/${page}`, { params: generateQueryParams(args)});
            return modelResponse(response.status, response.data);
        } catch (error) {
            return modelResponse(error.response.status, error.response.data);
        }
    }
};