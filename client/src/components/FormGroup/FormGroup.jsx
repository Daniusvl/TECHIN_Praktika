import React from "react";
import Form from "react-bootstrap/Form";
import { InputControl } from "../../ui/index";
import { classNames } from "../../shared/classNames.mjs";

export const FormGroup = ({label, type="text", placeholder, register, errors, classes, ...args}) => {
    return (
        <Form.Group className={classNames("mb-3", classes)}>
            <Form.Label>{label}</Form.Label>
            <InputControl type={type} placeholder={placeholder} register={register} {...args} />
            <Form.Text muted>{errors && errors.message}</Form.Text>
        </Form.Group>
    );
};