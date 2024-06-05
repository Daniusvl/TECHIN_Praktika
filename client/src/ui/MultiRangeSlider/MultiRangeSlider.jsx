import React, { useCallback, useEffect, useState, useRef } from "react";

import styles from "./MultiRangeSlider.module.css";
import { classNames } from "../../shared/classNames.mjs";

export const MultiRangeSlider = ({min, max, onChange, enabled = true}) => {

    const [minValue, setMinValue] = useState(min);
    const [maxValue, setMaxValue] = useState(max);

    const [initialRender, setInitialRender] = useState(true);

    const minRef = useRef(null);
    const maxRef = useRef(null);
    const range = useRef(null);
    const thumbLeft = useRef(null);
    const thumbRight = useRef(null);

    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    useEffect(()=>{
        if(!enabled){
            range.current.style["background-color"] = "gray";
            thumbLeft.current.style["background-color"] = "gray";
            thumbRight.current.style["background-color"] = "gray";
        }
        else{
            range.current.style["background-color"] = "";
            thumbLeft.current.style["background-color"] = "";
            thumbRight.current.style["background-color"] = "";
        }
    },[enabled]);

    useEffect(()=>{
        if(minRef.current && range.current && enabled){
            const minPrecent = getPercent(+minValue);
    
            range.current.style.left = `${+minPrecent}%`;
            thumbLeft.current.style.left = `${+minPrecent}%`;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [minValue]);

    useEffect(()=>{
        if(maxRef.current && range.current && enabled){
            const maxPrecent = getPercent(maxValue);

            range.current.style.right = `${100-maxPrecent}%`;
            thumbRight.current.style.right = `${100-maxPrecent}%`;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maxValue]);

    useEffect(()=>{
        if(!initialRender){
            onChange({min: minValue, max: maxValue});
        }
        setInitialRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [minValue, maxValue]);

    const onMinChange = useCallback((event) => {
        if(enabled){
            const value = Math.min(+event.target.value, maxValue - 1);
            setMinValue(value);
            event.target.value = value.toString();
        }
    }, [maxValue, enabled]);

    const onMaxChange = useCallback((event) => {
        if(enabled){
            const value = Math.max(+event.target.value, minValue + 1);
            setMaxValue(value);
            event.target.value = value.toString();
        }
        
    }, [minValue, enabled]);

    useEffect(()=>{
        onMaxChange({target:{
            value: max
        }});
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [max]);

    return (
        <div className={styles.main}>
            <input type="range" 
                ref={minRef}
                min={min} 
                max={max} 
                value={minValue} 
                onChange={onMinChange}
                className={classNames(styles.input, styles.inputLeft)}
                disabled={!enabled}
            />
            <input type="range"
                ref={maxRef} 
                min={min}
                max={max} 
                value={maxValue}
                onChange={onMaxChange} 
                className={classNames(styles.input)}
                disabled={!enabled}
            />

            <div className={styles.slider}>
                <div className={styles.range} ref={range}></div>
                <div className={classNames(styles.thumb, styles.leftThumb)} ref={thumbLeft}>
                </div>
                <div className={classNames(styles.thumb, styles.rightThumb)} ref={thumbRight}>
                </div>
                <div className={styles.minValue}>
                    {minValue}
                </div>
                <div className={styles.maxValue}>
                    {maxValue}
                </div>
            </div>
        </div>
    );
};
