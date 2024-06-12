import React from "react";
import Form from "react-bootstrap/Form";

import styles from "./InputControl.module.css";

export const InputControl = ({register, ...args}) => {
    return (
        <Form.Control className={styles.input} {...register} {...args}/>
    );
};
