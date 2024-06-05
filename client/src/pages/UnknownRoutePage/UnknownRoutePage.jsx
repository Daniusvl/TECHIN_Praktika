import React from "react";

import styles from "./UnknownRoutePage.module.css";

const UnknownRoutePage = () => {
    return (
        <div className={styles.main}>
            <div className={styles.textContainer}>
                <p className={styles.text}>
                    404 - Page not found
                </p>
            </div>
        </div>
    );
};

export default UnknownRoutePage;