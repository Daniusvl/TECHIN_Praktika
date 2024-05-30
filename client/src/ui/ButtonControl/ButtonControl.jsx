import React from "react";

import {classNames} from "../../shared/classNames.mjs";

import styles from "./ButtonControl.module.css";

import Spinner from "react-bootstrap/Spinner";

export const ButtonControl = ({children, isLoading}) => {
    return (
        <button className={classNames("btn", styles.btn_colors)}>
            {
                isLoading &&
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
            }
            {children}
        </button>
    );
};
