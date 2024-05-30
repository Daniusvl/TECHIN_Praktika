import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { FormGroup } from "../../components/index";
import styles from "./RegisterForm.module.css";
import { ButtonControl, DisplayServerSideErrorAlert } from "../../ui/index";
import { useRegistration } from "./hooks/useRegistration";
import { useNavigate } from "react-router-dom";
import { classNames } from "../../shared/classNames.mjs";

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
            {serverSideError && DisplayServerSideErrorAlert()}
            <div className={classNames("mb-3", styles.form_header)}>Registration</div>
            <FormGroup label="Email address" placeholder="example@mail.com" register={register("email", {
                pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Please enter a valid email",
                }
            })} errors={errors.email}/>
            <FormGroup label="Password" placeholder="Password1!" type="password" register={register("password", {
                minLength: {
                    value: 8,
                    message: "Password must be in between 8 and 20 characters"
                },
                maxLength: {
                    value: 20,
                    message: "Password must be in between 8 and 20 characters"
                },
                pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~#^_+=\-';,./|":<>?])[A-Za-z\d@$!%*?&~#^_+=\-';,./|":<>?]{8,20}$/,
                    message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                }
            })} errors={errors.password}/>
            <FormGroup label="Repeat password" placeholder="Password1!" type="password" register={register("repeatPassword", {
                minLength: {
                    value: 8,
                    message: "Password must be in between 8 and 20 characters"
                },
                maxLength: {
                    value: 20,
                    message: "Password must be in between 8 and 20 characters"
                },
                pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~#^_+=\-';,./|":<>?])[A-Za-z\d@$!%*?&~#^_+=\-';,./|":<>?]{8,20}$/,
                    message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                }
            })} errors={errors.repeatPassword}/>
            <ButtonControl isLoading={isLoading}>Register</ButtonControl>
        </Form>
    );
};
