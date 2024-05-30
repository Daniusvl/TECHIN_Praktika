import React, { useEffect } from "react";
import { SuccessfulRegistration } from "../../components";
import { LoginForm, LoginProvider } from "../../models";
import { useAuth } from "../../shared/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {

    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated){
            navigate("/");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    return (
        <div>
            <SuccessfulRegistration />
            <LoginProvider>
                <LoginForm/>
            </LoginProvider>
        </div>
    );
};
