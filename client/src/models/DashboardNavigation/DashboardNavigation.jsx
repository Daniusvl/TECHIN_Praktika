import React, { useCallback } from "react";

import styles from "./DashboardNavigation.module.css";
import { Link } from "react-router-dom";
import { classNames } from "../../shared/classNames.mjs";

// 1 active, 2 history
export const DashboardNavigation = ({navigation, setNavigation}) => {

    const setActive = useCallback(() => setNavigation(1), [setNavigation]);
    const setHistory = useCallback(() => setNavigation(2), [setNavigation]);

    return (
        <div className={styles.main}>
            <Link className={classNames(styles.link, navigation === 1 ? styles.active : "")} onClick={setActive}>
                Active
            </Link>
            <Link className={classNames(styles.link, navigation === 2 ? styles.active : "")} onClick={setHistory}>
                History
            </Link>
        </div>
    );
};
