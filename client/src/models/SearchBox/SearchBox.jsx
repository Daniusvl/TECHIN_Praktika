import React, {useCallback} from "react";

import styles from "./SearchBox.module.css";
import { InputControl } from "../../ui";

import { setArgs, removeArgs } from "../../shared/api/tourBaseModel";

export const SearchBox = ({searchChanged}) => {

    const debounce = useCallback((event) => {
        // eslint-disable-next-line no-unused-vars
        let timerId;
        return function () {
            timerId = setTimeout(() => {
                if(event.target.value.trim().length > 0){
                    setArgs({searchNameQuery: event.target.value});
                }
                else{
                    removeArgs("searchNameQuery");
                }
                searchChanged();
            }, 300);
        };
    }, [searchChanged]);

    const handleSearchInputChange = useCallback((event) => {
        debounce(event)();
    }, [debounce]);

    return (
        <div className={styles.box}>
            <InputControl type="text" placeholder="Search..." onChange={handleSearchInputChange} />
        </div>
    );
};
