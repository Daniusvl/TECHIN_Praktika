import React from "react";

import Form from "react-bootstrap/Form";

import styles from "./Input.module.css";

export const Input = ({onChange}) => {

    return (
        <Form.Control className={styles.input} type="text" placeholder="search..." onChange={onChange} />
    );
};
