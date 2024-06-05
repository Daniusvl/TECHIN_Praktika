import React from "react";

import styles from "./TourContentHeader.module.css";
import { SortBy, SortOrder, TourPagination } from "../../components";
import { classNames } from "../../shared/classNames.mjs";

export const TourContentHeader = ({setSortBy, setSortOrder, page, setPage, lastPage}) => {
    
    return (
        <div className={styles.main}>
            <div className="p-2">Sort by</div>
            <div className={classNames("p-2", styles.sortBy)}>
                <SortBy setValue={setSortBy}/>
            </div>
            <div className={classNames("p-2", styles.sortOrder)}>
                <SortOrder setValue={setSortOrder} />
            </div>
            <div className={classNames("p-2", styles.pagination)}>
                <TourPagination page={page} setPage={setPage} lastPage={lastPage}/>
            </div>
        </div>
    );
};
