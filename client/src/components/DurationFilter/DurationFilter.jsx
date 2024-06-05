import React, { useCallback } from "react";

import { FilterCategory, MultiRangeSlider } from "../../ui";

import { setArgs } from "../../shared/api/tourBaseModel";

export const DurationFilter = ({maxDurationValue}) => {

    const setValues = useCallback(({min, max}) => {
        if(max > min) {
            setArgs({minDuration: min, maxDuration: max});
        }
        
    }, []);


    return (
        <FilterCategory header="Duration">
            <MultiRangeSlider min={1} max={maxDurationValue ? maxDurationValue : 24*7} onChange={setValues} />
        </FilterCategory>
    );
};
