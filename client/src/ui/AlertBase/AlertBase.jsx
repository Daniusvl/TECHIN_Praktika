import React from "react";
import Alert from "react-bootstrap/Alert";
import styles from "./AlertBase.module.css";

export const AlertBase = ({heading, children, variant, onClose, show}) => {
    return (
        <Alert className={styles.alert} variant={variant} onClose={onClose} show={show} dismissible>
            <Alert.Heading>{heading}</Alert.Heading>
            {children}
        </Alert>
    );
};
