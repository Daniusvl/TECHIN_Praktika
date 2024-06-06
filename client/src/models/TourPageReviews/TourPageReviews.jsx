import React from "react";

import styles from "./TourPageReviews.module.css";
import { Review } from "../../components";

export const TourPageReviews = ({ reviews }) => {
    return (
        <div className={styles.main} id="comments">
            {
                reviews && reviews.length > 0 &&
                <div>
                    <div className={styles.header}>
                        Reviews
                    </div>
                    <div>
                        {reviews.filter(v => v.score).map(v => <Review key={v.id} review={v} />)}
                    </div>
                </div>
            }
        </div>
    );
};
