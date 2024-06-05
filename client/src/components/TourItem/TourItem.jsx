import React from "react";

import ListGroup from "react-bootstrap/ListGroup";

import { CardItem } from "../../ui";
import { BASE_URL } from "../../shared/api/base.mjs";

import styles from "./TourItem.module.css";
import { classNames } from "../../shared/classNames.mjs";

export const TourItem = ({ tour }) => {
    return (
        <CardItem className={classNames(styles.main, styles.bg_color)}
            description={tour.description}
            img={`${BASE_URL}${tour.imgPath}`}
            to="#"
            title={tour.name}
        >
            <ListGroup className={"list-group-flush"}>

                <ListGroup.Item className={styles.bg_color}>
                    Score: {
                        tour.avgScore ? 
                            <>{tour.avgScore}/10</> : 
                            <>no scores</>
                    }
                </ListGroup.Item>

                <ListGroup.Item className={styles.bg_color}>
                    Type: {
                        tour.isSingle ? 
                            <>Single</> : 
                            <>Group</>
                    }
                </ListGroup.Item>

                <ListGroup.Item className={styles.bg_color}>
                    Duration: {
                        tour.durationInHours === 1 ? 
                            <>{tour.durationInHours} hour</> : 
                            <>{tour.durationInHours} hours</>
                    }
                </ListGroup.Item>
                
                <ListGroup.Item className={styles.bg_color}>
                    Price: {
                        tour.price === 0 ? 
                            <>Free</> : 
                            <>{tour.price/100} $</>
                    }
                </ListGroup.Item>

            </ListGroup>
        </CardItem>
    );
};
