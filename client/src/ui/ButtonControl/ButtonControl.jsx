import React from "react";

import {classNames} from "../../shared/classNames.mjs";

import styles from "./ButtonControl.module.css";

export const ButtonControl = ({children}) => {
    return (
        <button className={classNames("btn", styles.btn_colors)}>{children}</button>
    );
};
