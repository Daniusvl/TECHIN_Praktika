import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tourBaseModel } from "../../shared/api/tourBaseModel";

import styles from "./TourPage.module.css";
import { Spinner } from "../../ui";
import { TourPageReviews, TourPageItem } from "../../models/";

const TourPage = () => {

    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [tour, setTour] = useState(undefined);
    
    useEffect(() => {

        (async () => {
            const {status, data} = await tourBaseModel.getTourBaseById(id);

            if(status === 200){
                setTour(data);
            }
            else{
                setNotFound(true);
            }
            
            setIsLoading(false);
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getReviews = useCallback((tour) => {
        const maped = tour.tourInstances.map(v => {
            return {
                id: v._id,
                startDate: new Date(v.startDate),
                reviews: v.tourCandidates.map(b => {
                    return {
                        id: b._id,
                        score: b.score,
                        review: b.review,
                        userMail: b.user.email
                    };
                })
            };
        });

        const result = [];
        for (let i = 0; i < maped.length; i++) {
            for (let j = 0; j < maped[i].reviews.length; j++) {
                result.push({
                    id: maped[i].id,
                    date: maped[i].startDate,
                    reviewId: maped[i].reviews[j].id,
                    score: maped[i].reviews[j].score,
                    review: maped[i].reviews[j].review,
                    userMail: maped[i].reviews[j].userMail,
                });
            }
        }

        return result;

    }, []);

    return (
        <div className={styles.main}>
            {
                isLoading && !notFound && 
                <div className={styles.spinnerContainer}>
                    <Spinner className={styles.spinner} />
                </div>
            }
            {
                !isLoading && notFound && <div className={styles.notFoundContainer}>
                    <p className={styles.text}>
                        Tour not found
                    </p>
                </div> 
            }
            {
                !isLoading && !notFound && 
                <>
                    <TourPageItem tour={tour} />
                    <TourPageReviews reviews={getReviews(tour)} />
                </>
            }
        </div>
    );
};

export default TourPage;