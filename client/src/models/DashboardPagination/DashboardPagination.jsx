import React from "react";

import styles from "./DashboardPagination.module.css";
import { Pagination } from "../../components";

export const DashboardPagination = ({activePage, setPage, lastPage}) => {
    return (
        <div className={styles.main}>
            <div className={styles.pagination}>
                <Pagination activePage={activePage} lastPage={lastPage} setPage={setPage} />
            </div>
        </div>
    );
};
