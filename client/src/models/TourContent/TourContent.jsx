import React from "react";

import styles from "./TourContent.module.css";

import { TourItem } from "../../components";

export const TourContent = ({tours}) => {
    return (
        <div className={styles.main}>
            <div className={styles.grid_container}>
                {tours.map(tour => 
                    <TourItem key={tour._id} tour={tour}/>
                )}
            </div>
        </div>
    );
};
