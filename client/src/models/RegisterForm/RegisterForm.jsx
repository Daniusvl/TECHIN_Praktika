import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { FormGroup, ServerSideErrorAlert } from "../../components/index";
import styles from "./RegisterForm.module.css";
import { ButtonControl } from "../../ui/index";
import { useRegistration } from "./hooks/useRegistration";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../shared/classNames.mjs";
import { emailValidation, passwordValidation } from "../../shared/commonValidation.mjs";

export const RegisterForm = () => {

    const {
        register,
        setError,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm();

    const navigate = useNavigate();

    const {registration} = useRegistration();

    const [serverSideError, setServerSideError] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const onFormSubmit = useCallback(async (formFields) => {
        setIsLoading(true);
        try {
            setServerSideError(false);    
            const [success, data] = await registration(formFields);
    
            if(!success){
                const errors = data.errors;
                for (let i = 0; i < errors.length; i++) {
                    setError(errors[i].path, {
                        message: errors[i].msg
                    });
                }
            }
            else{
                navigate("/login", {state:{fromSuccessfulRegistration: true}});
            }
        } catch (error) {
            setServerSideError(true);
        }
        setIsLoading(false);
    }, [registration, setError, navigate, setServerSideError]);

    return (
        <Form className={styles.form} onSubmit={handleSubmit(onFormSubmit)}>

            {serverSideError && ServerSideErrorAlert()}

            <div className={classNames("mb-3", styles.form_header)}>Registration</div>

            <FormGroup label="Email address" placeholder="example@mail.com" 
                register={register("email", emailValidation)} errors={errors.email}/>

            <FormGroup label="Password" placeholder="Password1!" type="password" 
                register={register("password", passwordValidation)} errors={errors.password}/>

            <FormGroup label="Repeat password" placeholder="Password1!" type="password" 
                register={register("repeatPassword", passwordValidation)} errors={errors.repeatPassword}/>
                
            <ButtonControl isLoading={isLoading}>Register</ButtonControl>
        </Form>
    );
};
