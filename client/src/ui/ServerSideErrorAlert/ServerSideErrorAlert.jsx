import React from "react";
import Alert from "react-bootstrap/Alert";
import styles from "./ServerSideErrorAlert.module.css";

export const ServerSideErrorAlert = () => {
    return (
        <Alert className={styles.alert} variant="danger" dismissible>
            <Alert.Heading>Server side error</Alert.Heading>
            <p>Unknown error occured on the server. Please try again later</p>
        </Alert>
    );
};
