export const generateTourCandidatesPipeline = (userId, dateMatch) => {
    return [
        {
            $match: { user: userId }
        },
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
    ];
};