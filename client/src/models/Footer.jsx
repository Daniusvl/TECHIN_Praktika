import React from 'react'

import styles from "./Footer.module.css";
import Stack from 'react-bootstrap/Stack';

export const Footer = () => {
    return (
        <footer>
            <Stack direction="horizontal" gap={3} className={styles.main}>
                <div className={`p-2 ${styles.main_text}`}>TECHIN praktikos projektas</div>
                <div className="p-2 ms-auto">autorius Danielius Vlasenko</div>
            </Stack>
        </footer>
    )
}
