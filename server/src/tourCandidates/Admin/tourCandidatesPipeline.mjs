export const generateTourCandidatesPipeline = (dateMatch, page, itemsPerPage) => {
    return [
        {
            $lookup: {
                from: "ToursInstance",
                localField: "tourInstance",
                foreignField: "_id",
                as: "tourInstance",
                pipeline: [
                    {
                        $match: {
                            startDate: dateMatch
                        }
                    },
                    {
                        $lookup: {
                            from: "ToursBase",
                            localField: "tourBase",
                            foreignField: "_id",
                            as: "tourBase"
                        }
                    },
                    {
                        $unwind: "$tourBase"
                    }
                ]
            }
        },
        {
            $unwind: "$tourInstance"
        },
        {
            $lookup:{
                from: "Users",
                localField: "user",
                foreignField: "_id",
                as: "user",
            }
        },
        {
            $unwind: "$user"
        },
        {
            $facet: {
                data: [
                    {
                        $skip: itemsPerPage*page-itemsPerPage
                    },
                    {
                        $limit: itemsPerPage
                    }
                ],
                totalCount: [
                    { $count: "count" }
                ]
            }
        },
        {
            $project: {
                data: 1,
                pageCount: { $arrayElemAt: ["$totalCount.count", 0] }
            }
        },
    ];
};