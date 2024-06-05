import React from "react";
import { SearchInput } from "../../components/index";

import styles from "./SearchBox.module.css";

export const SearchBox = ({searchChanged}) => {

    return (
        <div className={styles.box}>
            <SearchInput searchChanged={searchChanged} />
        </div>
    );
};
