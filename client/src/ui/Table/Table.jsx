import React from "react";

import styles from "./Table.module.css";
import { classNames } from "../../shared/classNames.mjs";

export const Table = ({children, ...args}) => {
    return (
        <table className={classNames(styles.main, args["classes"])} {...args}>
            {children}
        </table>
    );
};
