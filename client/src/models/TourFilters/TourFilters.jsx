import React from "react";

import styles from "./TourFilters.module.css";

import { DurationFilter, PriceFilter, ScoreFilter, TypeFilter } from "../../components";
import { ButtonControl } from "../../ui";

export const TourFilters = ({saveLoading, saveOnClick, maxPriceValue, maxDurationValue}) => {

    return (
        <div>
            <div className={styles.header}>
                <div>
                    Filters
                </div>
                <div>
                    <ButtonControl isLoading={saveLoading} onClick={saveOnClick}>
                        Save
                    </ButtonControl>
                </div>
            </div>
            <div className={styles.filters}>
                <div>
                    <PriceFilter maxPriceValue={maxPriceValue} />
                </div>
                <div>
                    <DurationFilter maxDurationValue={maxDurationValue} />
                </div>
                <div>
                    <ScoreFilter />
                </div>
                <div>
                    <TypeFilter />
                </div>
            </div>
        </div>
    );
};
