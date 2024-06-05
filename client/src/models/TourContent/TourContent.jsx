import React from "react";

import styles from "./TourContent.module.css";

import { TourItem } from "../../components";
import Spinner from "react-bootstrap/esm/Spinner";

export const TourContent = ({tours, isLoading}) => {
    return (
        <div className={styles.main}>
            {
                !isLoading && tours.length === 0 &&
                <div className={styles.defaultContainer}>
                    <p className={styles.noTourMessage}>
                        Could not find any tours...
                    </p>
                </div>
            }

            {
                isLoading ?
                    <div className={styles.defaultContainer}>
                        <Spinner className={styles.spinner} />
                    </div> 
                    : 
                    <div className={styles.grid_container}>
                        {tours.map(tour => 
                            <TourItem key={tour._id} tour={tour}/>
                        )}
                    </div>
            }

            
        </div>
    );
};
