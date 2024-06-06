import React from "react";

import Form from "react-bootstrap/Form";

import styles from "./Select.module.css";

export const Select = ({children, onChange, size="sm", defaultValue, register}) => {
    return (
        <Form.Select className={styles.select} size={size} onChange={onChange} defaultValue={defaultValue} {...register} >
            {children}
        </Form.Select>
    );
};
