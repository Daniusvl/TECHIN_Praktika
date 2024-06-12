import React, { useCallback } from "react";

import styles from "./SearchBox.module.css";
import { InputControl } from "../../ui";

import { setArgs, removeArgs } from "../../shared/api/tourBaseModel";

export const SearchBox = ({searchChanged, controller}) => {

    const debounce = useCallback(() => {
        // eslint-disable-next-line no-unused-vars
        let timerId;
        return function (event) {
            if(controller.current){
                controller.current.abort();
            }
            if(timerId){
                clearTimeout(timerId);
            }
            timerId = setTimeout(() => {
                if(event.target.value.trim().length > 0){
                    setArgs({searchNameQuery: event.target.value});
                }
                else{
                    removeArgs("searchNameQuery");
                }
                searchChanged();
            }, 500);
        };
    }, [searchChanged, controller]);

    const debounced = debounce();

    const handleSearchInputChange = useCallback((event) => {
        debounced(event);
    }, [debounced]);

    return (
        <div className={styles.box}>
            <InputControl type="text" placeholder="Search..." onChange={handleSearchInputChange} />
        </div>
    );
};
