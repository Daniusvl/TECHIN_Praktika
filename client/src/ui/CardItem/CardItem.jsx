import React from "react";

import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { classNames } from "../../shared/classNames.mjs";

import styles from "./CardItem.module.css";

export const CardItem = ({children, className, title, description, img, to}) => {
    return (
        <Card className={classNames(styles.main, className)}>
            <Card.Img className={styles.img} variant="top" src={img} />
            <Card.Body>
                <Card.Title title={title}>
                    { title.substr(0,15) } {title.length > 15 && <> ...</>}
                </Card.Title>
                <Card.Text title={description}>
                    { description.substr(0, 20) } {description.length > 20 && <> ...</>}
                </Card.Text>
            </Card.Body>
            {children}
            <Card.Body>
                <Card.Link as={Link} to={to}>Details</Card.Link>
            </Card.Body>
        </Card>
    );
};
