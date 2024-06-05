import React from "react";

import style from "./FilterCategory.module.css";

export const FilterCategory = ({children, header}) => {
    return (
        <div className={style.main}>
            <div className={style.header}>{header}</div>
            {children}
        </div>
    );
};
