import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { FormGroup } from "../../components/index";
import styles from "./LoginForm.module.css";
import { ButtonControl, DisplayServerSideErrorAlert } from "../../ui/index";
import { useLogin } from "./hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../shared/hooks/useAuth";
import { classNames } from "../../shared/classNames.mjs";

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

    const { authenticate } = useAuth();

    const { login } = useLogin();

    const [serverSideError, setServerSideError] = useState(false);

    const onFormSubmit = useCallback(async (formFields) => {
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
                navigate("/");
            }
        } catch (error) {
            setServerSideError(true);
        }

    }, [login, setError, navigate, setServerSideError, authenticate]);

    return (
        <div className={styles.form_container}>
            {serverSideError && DisplayServerSideErrorAlert()}

            <Form className={styles.form} onSubmit={handleSubmit(onFormSubmit)}>

                <div className={classNames("mb-3", styles.form_header)}>Login</div>

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

                <ButtonControl>login</ButtonControl>
            </Form>
        </div>
    );
};
