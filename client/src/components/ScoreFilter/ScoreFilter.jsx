import React, { useCallback, useState } from "react";

import { FilterCategory, MultiRangeSlider } from "../../ui";

import { setArgs, removeArgs } from "../../shared/api/tourBaseModel";

import styles from "./ScoreFilter.module.css";

export const ScoreFilter = () => {

    const [minScore, setMinScore] = useState(1);
    const [maxScore, setMaxScore] = useState(10);

    const [byScore, setByScore] = useState(false);

    const setValues = useCallback(({min, max}) => {
        setMinScore(min);
        setMaxScore(max);

        if(byScore){
            setArgs({minScore: min, maxScore: max});
        }
        
    }, [setMaxScore, setMinScore, byScore]);

    const changeByScore = useCallback((event) => {
        setByScore(v => !v);

        if(!event.target.checked){
            removeArgs("minScore", "maxScore");
        }
        else{
            setArgs({minScore, maxScore});
        }
    },[minScore, maxScore]);

    return (
        <FilterCategory header="Score">
            <div className={styles.byScore}>
                <input type="checkbox" className={styles.checkboxByScore} checked={byScore} onChange={changeByScore}/> 
                <span>filter by score</span>
            </div>
            <MultiRangeSlider min={1} max={10} onChange={setValues} enabled={byScore} />
        </FilterCategory>
    );
};
