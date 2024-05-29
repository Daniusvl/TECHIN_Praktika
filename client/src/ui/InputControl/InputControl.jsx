import React from "react";
import Form from "react-bootstrap/Form";

import styles from "./InputControl.module.css";

export const InputControl = ({type, placeholder, register}) => {
    return (
        <Form.Control className={styles.input} type={type} placeholder={placeholder} {...register} />
    );
};
