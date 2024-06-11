import React, { useCallback, useState } from "react";

import styles from "./Range.module.css";

export const Range = ({register, ...args}) => {
    
    const [value, setValue] = useState(5);
    
    const onChangeEvent = useCallback((event) => {
        setValue(event.target.value);
    }, []);

    return (
        <div className={styles.main}>
            <div className={styles.input}>
                <input type="range" {...register} {...args} onChange={onChangeEvent} value={value}/>
            </div>
            <div>
                <span>{value}</span>
            </div>
        </div>
    );
};
