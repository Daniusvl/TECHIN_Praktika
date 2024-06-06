import React from "react";

import styles from "./TourPageItem.module.css";
import { BASE_URL } from "../../shared/api/base.mjs";
import { TourRegistrationForm } from "../../components";

export const TourPageItem = ({tour}) => {
    //  a!!!!!!!!!!!!!!!!
    console.log("tour", tour);
    //  a!!!!!!!!!!!!!!!!

    return (
        <div className={styles.main}>
            <div className={styles.mainData}>
                <div className={styles.imgContainer}>
                    <div className={styles.imgBox}>
                        <img className={styles.img} src={`${BASE_URL}/${tour.imgPath}`} alt="tour" />
                    </div>
                </div>
                <div>
                    <div className={styles.data}>
                        <div className={styles.name}>
                            {tour.name}
                        </div>
                        <div>
                            <span className={styles.bold}>{tour.avgScore}/10</span> <a href="#comments">See reviews</a>
                        </div>
                        <div>
                            approximately <span className={styles.bold}>{tour.durationInHours}</span> hours long
                        </div>
                        <div className={styles.itallic}>
                            {
                                tour.isSingle ? 
                                    <>
                                        For single person
                                    </> : 
                                    <>
                                        For a group
                                    </>
                            }
                        </div>
                        <div>
                            Price: 
                            <span className={styles.bold}>
                                {
                                    tour.price === 0 ? <> Free</> : <>{tour.price} $</>
                                }
                            </span>
                        </div>
                    </div>
                    <div className={styles.tourRegistrationBox}>
                        <TourRegistrationForm tour={tour}/>
                    </div>
                </div>
            </div>
            <div className={styles.description}>
                {tour.description}         
            </div>
        </div>
    );
};
