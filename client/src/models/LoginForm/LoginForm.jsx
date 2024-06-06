import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { FormGroup, ServerSideErrorAlert } from "../../components/index";
import styles from "./LoginForm.module.css";
import { ButtonControl } from "../../ui/index";
import { useLogin } from "./hooks/useLogin";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../shared/hooks/useAuth";
import { classNames } from "../../shared/classNames.mjs";
import { emailValidation, passwordValidation } from "../../shared/commonValidation.mjs";

export const LoginForm = () => {
    const {
        register,
        setError,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm();

    const navigate = useNavigate();
    const location = useLocation();

    const { authenticate } = useAuth();

    const { login } = useLogin();

    const [serverSideError, setServerSideError] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const onFormSubmit = useCallback(async (formFields) => {
        setIsLoading(true);
        try {
            setServerSideError(false);    
            const [success, data] = await login(formFields);
    
            if(!success){
                const errors = data.errors;
                for (let i = 0; i < errors.length; i++) {
                    setError(errors[i].path, {
                        message: errors[i].msg
                    });
                }
            }
            else{
                authenticate(data.token);
                if(location.state && location.state.redirect){
                    navigate(location.state.redirect);
                }
                else{
                    navigate("/");
                }
            }
        } catch (error) {
            setServerSideError(true);
        }
        setIsLoading(false);
    }, [login, setError, navigate, setServerSideError, authenticate, location.state]);

    return (
        <div className={styles.form_container}>
            {serverSideError && ServerSideErrorAlert()}

            <Form className={styles.form} onSubmit={handleSubmit(onFormSubmit)}>

                <div className={classNames("mb-3", styles.form_header)}>Login</div>

                <FormGroup label="Email address" placeholder="example@mail.com" 
                    register={register("email", emailValidation)} errors={errors.email}/>
                    
                <FormGroup label="Password" placeholder="Password1!" type="password" 
                    register={register("password", passwordValidation)} errors={errors.password}/>

                <ButtonControl isLoading={isLoading}>login</ButtonControl>
            </Form>
        </div>
    );
};
