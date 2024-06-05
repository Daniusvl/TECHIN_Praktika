import React, { useCallback, useState } from "react";

import { FilterCategory, MultiRangeSlider } from "../../ui";

import styles from "./PriceFilter.module.css";
import { setArgs, removeArgs } from "../../shared/api/tourBaseModel";

export const PriceFilter = ({maxPriceValue}) => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000);
    const [freeOnly, setFreeOnly] = useState(false);

    const setValues = useCallback(({min, max}) => {
        setMinPrice(min);
        setMaxPrice(max);

        if(max > min){
            setArgs({minPrice: min, maxPrice: max});
        }
    }, []);

    const changeFreeOnly = useCallback((event)=>{
        setFreeOnly(v => !v);
        setArgs({priceFree: event.target.checked});
        if(event.target.checked){
            removeArgs("minPrice", "maxPrice");
        }
        else{
            setArgs({minPrice, maxPrice});
        }
    }, [setFreeOnly, maxPrice, minPrice]);

    return (
        <FilterCategory header="Price">
            <div>
                <div className={styles.freeOnly}>
                    <input type="checkbox" className={styles.checkboxFreeOnly} checked={freeOnly} onChange={changeFreeOnly}/> 
                    <span>Free only</span>
                </div>
                <MultiRangeSlider min={0} max={maxPriceValue ? maxPriceValue : 100000} onChange={setValues} enabled={!freeOnly} />
            </div>
        </FilterCategory>
    );
};
