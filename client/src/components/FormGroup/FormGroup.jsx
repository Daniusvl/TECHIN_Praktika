import React from "react";
import Form from "react-bootstrap/Form";
import { InputControl } from "../../ui/index";

export const FormGroup = ({label, type="text", placeholder, register, errors}) => {
    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <InputControl type={type} placeholder={placeholder} register={register} />
            <Form.Text muted>{errors && errors.message}</Form.Text>
        </Form.Group>
    );
};