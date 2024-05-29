import React from "react";
import { RegisterForm } from "../../models/index.jsx";
import styles from "./RegisterPage.module.css";
import { RegistrationProvider } from "./hooks/useRegistration.jsx";

export const RegisterPage = () => {
    return (
        <div className={styles.form_container}>
            <RegistrationProvider>
                <RegisterForm />
            </RegistrationProvider>
        </div>
    );
};
