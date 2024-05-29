import React from "react";
import { RegisterForm, RegistrationProvider } from "../../models/index.jsx";
import styles from "./RegisterPage.module.css";

export const RegisterPage = () => {
    return (
        <div className={styles.form_container}>
            <RegistrationProvider>
                <RegisterForm />
            </RegistrationProvider>
        </div>
    );
};
