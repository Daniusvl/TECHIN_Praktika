import React from "react";

import { Spinner } from "../../ui";

import styles from "./SuspenseFallbackPage.module.css";

export const SuspenseFallbackPage = () => {
    return (
        <div className={styles.main}>
            <Spinner className={styles.spinner} />
        </div>
    );
};
