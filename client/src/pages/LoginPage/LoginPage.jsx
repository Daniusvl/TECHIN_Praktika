import React from "react";
import { useLocation } from "react-router-dom";

export const LoginPage = () => {

    const location = useLocation();

    return (
        <div>
            <h1>{location.state && location.state.fromSuccessfulRegistration && <>Registration Successful!</>}</h1>
            LoginPage
        </div>
    );
};
