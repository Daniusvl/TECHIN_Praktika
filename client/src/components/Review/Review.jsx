import React from "react";

import styles from "./Review.module.css";
import { dateToString } from "../../shared/dateConverter";

export const Review = ({review}) => {

    console.log("review", review);

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                {review.userMail} went in {dateToString(review.date)}
            </div>
            <div className={styles.header}>
                score: {review.score}/10
            </div>
            {
                review.review &&
                    <div className={styles.review}>
                        review:
                        <p>
                            {review.review}
                        </p>
                    </div>
            }
        </div>
    );
};
