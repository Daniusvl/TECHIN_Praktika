import React, { useCallback } from "react";

import styles from "./DashboardNavigation.module.css";
import { Link } from "react-router-dom";
import { classNames } from "../../shared/classNames.mjs";

export const DashboardNavigation = ({navigation, setNavigation, links}) => {

    const setActive = useCallback((i) => {
        return () => setNavigation(i);
    }, [setNavigation]);

    return (
        <div className={styles.main}>
            {
                links.map((value, i) => 
                    <Link key={i} className={classNames(styles.link, navigation === i+1 ? styles.active : "")} onClick={setActive(i+1)}>
                        {value}
                    </Link>)
            }

        </div>
    );
};
