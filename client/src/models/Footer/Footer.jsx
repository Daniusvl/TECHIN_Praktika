import React from "react";

import styles from "./Footer.module.css";
import Stack from "react-bootstrap/Stack";
import { classNames } from "../../shared/classNames.mjs";

export const Footer = () => {
    return (
        <footer>
            <Stack direction="horizontal" gap={3} className={styles.main}>
                <div className={classNames("p-2", styles.main_text)}>TECHIN practice project</div>
                <div className="p-2 ms-auto">made by: Danielius Vlasenko</div>
            </Stack>
        </footer>
    );
};
