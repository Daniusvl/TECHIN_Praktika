import React from "react";
import { AlertBase } from "../../ui";
import { useLocation } from "react-router-dom";

import styles from "./SuccessfulRegistration.module.css";

export const SuccessfulRegistration = () => {

    const location = useLocation();

    return (
        <div className={styles.alert_container}>
            { location.state && location.state.fromSuccessfulRegistration && <AlertBase variant="success" heading="Registration successful" /> }
        </div>
    );
};
