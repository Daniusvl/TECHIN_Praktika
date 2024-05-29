import React from "react";
import { SuccessfulRegistration } from "../../components";
import { LoginForm, LoginProvider } from "../../models";

export const LoginPage = () => {

    return (
        <div>
            <SuccessfulRegistration />
            <LoginProvider>
                <LoginForm/>
            </LoginProvider>
        </div>
    );
};
