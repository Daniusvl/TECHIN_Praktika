import { Types } from "mongoose";
import { mainTourPageItemCount } from "../shared/config/tourCandidates.mjs";
import { 
    minPrice as defaultMinPrice, maxPrice as defaultMaxPrice,
    minDuration as defaultMinDuration, maxDuration as defaultMaxDuration
} from "./toursBaseValidator.mjs";

const getPriceMatch = (minPrice, maxPrice, priceFree) => {
    if(priceFree){
        return {
            $match: {
                price: 0
            }
        };
    }

    if(minPrice !== 0 && !minPrice || !maxPrice){
        minPrice = defaultMinPrice;
        maxPrice = defaultMaxPrice;
    }
    minPrice *=100;
    maxPrice *=100;
    return {
        $match: {
            $and: [
                {
                    price: {
                        $lte: maxPrice
                    }
                },
                {
                    price: {
                        $gte: minPrice
                    }
                }
            ]
        }
    };
};

const getSingleMatch = (singleOnly, multipleOnly) => {

    if(
        !singleOnly && !multipleOnly ||
        singleOnly && multipleOnly
    ){
        return {
            $match:{}
        };
    }

    if(singleOnly){
        return {
            $match: {
                isSingle: true
            }
        };
    }

    if(multipleOnly){
        return {
            $match: {
                isSingle: false
            }
        };
    }

    return {
        $match:{}
    };
};

const getDurationMatch = (minDuration, maxDuration) => {
    if(!minDuration || !maxDuration){
        minDuration = defaultMinDuration;
        maxDuration = defaultMaxDuration;
    }
    return {
        $match: {
            $and: [
                {
                    durationInHours: {
                        $lte: maxDuration
                    }
                },
                {
                    durationInHours: {
                        $gte: minDuration
                    }
                }
            ]
        }
    };
};

const getAvgScoreMatch = (minScore, maxScore) => {
    if(!minScore || !maxScore){
        return {$match:{}};
    }
    return {
        $match: {
            $and: [
                {
                    avgScore: {
                        $lte: maxScore
                    }
                },
                {
                    avgScore: {
                        $gte: minScore
                    }
                }
            ]
        }
    };
};

const getSearchNameQueryMatch = (searchNameQuery) => {
    if(!searchNameQuery){
        return {$match:{}};
    }
    return {
        $match:{
            name: {
                $regex: searchNameQuery, $options: "i"
            }
        }
    };
};

const getSortingPipe = (sortBy, desc) => {
    if(!sortBy){
        sortBy = "name";
    }
    const sortStage = {};
    sortStage[sortBy] = desc ? -1 : 1;

    return {
        $sort: sortStage
    };
};

export const getSearchPipeline = (args, page) => {
    const {
        minPrice, maxPrice, priceFree,
        singleOnly, multipleOnly,
        minDuration, maxDuration,
        minScore, maxScore,
        searchNameQuery,
        sortBy, desc
    } = args;

    return [
        getPriceMatch(minPrice, maxPrice, priceFree),
        getSingleMatch(singleOnly, multipleOnly),
        getDurationMatch(minDuration, maxDuration),
        getSearchNameQueryMatch(searchNameQuery),
        { 
            $lookup: {
                from: "ToursInstance",
                localField: "_id",
                foreignField: "tourBase",
                as: "tourInstances",
                pipeline: [
                    { 
                        $lookup: {
                            from: "TourCandidates",
                            localField: "_id",
                            foreignField: "tourInstance",
                            as: "tourCandidates",
                        }
                    },
                    {
                        $addFields: {
                            avgScore: {
                                $avg: "$tourCandidates.score"
                            }
                        }
                    },
                ]
            }
        },
        {
            $addFields: {
                avgScore: {
                    $avg: "$tourInstances.avgScore"
                },
            }
        },
        getAvgScoreMatch(minScore, maxScore),
        getSortingPipe(sortBy, desc),
        {
            $unset: "tourInstances"
        },
        {
            $facet: {
                data: [
                    {
                        $skip: mainTourPageItemCount*page-mainTourPageItemCount
                    },
                    {
                        $limit: mainTourPageItemCount
                    }
                ],
                totalCount: [
                    { 
                        $count: "count" 
                    }
                ],
            }
        },
        {
            $project: {
                data: 1,
                pageCount: { $arrayElemAt: ["$totalCount.count", 0] },
            }
        }
    ];
};


export const getByIdPipeline = (id) => {
    return [
        {
            $match:{
                "_id": new Types.ObjectId(id)
            }
        },
        { 
            $lookup: {
                from: "ToursInstance",
                localField: "_id",
                foreignField: "tourBase",
                as: "tourInstances",
                pipeline: [
                    { 
                        $lookup: {
                            from: "TourCandidates",
                            localField: "_id",
                            foreignField: "tourInstance",
                            as: "tourCandidates",
                            pipeline: [
                                {
                                    $lookup: {
                                        from: "Users",
                                        localField: "user",
                                        foreignField: "_id",
                                        as: "user",
                                        pipeline: [
                                            {                                            
                                                $project:{
                                                    _id: 1,
                                                    email: 1
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    $unwind: "$user"
                                },
                                {
                                    $project:{
                                        _id: 1,
                                        score: 1,
                                        review: 1,
                                        user: 1
                                    }
                                },
                            ]
                        }
                    },
                    {
                        $addFields: {
                            avgScore: {
                                $avg: "$tourCandidates.score"
                            }
                        }
                    },
                ]
            },
        },
        {
            $addFields: {
                avgScore: {
                    $avg: "$tourInstances.avgScore"
                },
            }
        },
    ];
};