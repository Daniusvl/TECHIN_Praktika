import React from "react";

import styles from "./PaginationItem.module.css";
import { classNames } from "../../shared/classNames.mjs";

export const PaginationItem = ({key, onClick, children, active = false}) => {
    return (
        <li key={key} className={classNames("page-item")}>
            <a className={classNames("page-link", styles.main, active ? styles.active : "")} role="button" onClick={onClick ? onClick : ()=>{}} tabIndex="0" href="#">
                {children}
            </a>
        </li>
    );
};
