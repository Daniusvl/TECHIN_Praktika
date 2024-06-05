import React, { useCallback, useEffect, useState } from "react";

import { FilterCategory } from "../../ui";

import { setArgs } from "../../shared/api/tourBaseModel";

import styles from "./TypeFilter.module.css";

export const TypeFilter = () => {

    const [singleOnly, setSingleOnly] = useState(true);
    const [multipleOnly, setMultipleOnly] = useState(true); 

    const changeSingleOnly = useCallback(() => {
        setSingleOnly(v => !v);
    }, []);

    const changeMultipleOnly = useCallback(() => {
        setMultipleOnly(v => !v);
    }, []);

    useEffect(() => {
        setArgs({singleOnly, multipleOnly});
    }, [singleOnly, multipleOnly]);

    return (
        <FilterCategory header="Type">
            <div className={styles.checkboxContainer}>
                <input type="checkbox" className={styles.checkbox} checked={singleOnly} onChange={changeSingleOnly}/> 
                <span>single</span>
            </div>
            <div className={styles.checkboxContainer}>
                <input type="checkbox" className={styles.checkbox} checked={multipleOnly} onChange={changeMultipleOnly}/> 
                <span>group</span>
            </div>
        </FilterCategory>
    );
};
