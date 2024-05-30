import React, { useEffect } from "react";
import { RegisterForm, RegistrationProvider } from "../../models/index.jsx";
import styles from "./RegisterPage.module.css";
import { useAuth } from "../../shared/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {

    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated){
            navigate("/");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    return (
        <div className={styles.form_container}>
            <RegistrationProvider>
                <RegisterForm />
            </RegistrationProvider>
        </div>
    );
};
