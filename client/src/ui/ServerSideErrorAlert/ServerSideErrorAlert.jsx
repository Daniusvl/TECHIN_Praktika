import React from "react";
import { AlertBase } from "../AlertBase/AlertBase";

export const ServerSideErrorAlert = () => {
    return (
        <AlertBase variant="danger" heading="Server side error">
            <p>Unknown error occured on the server. Please try again later</p>
        </AlertBase>
    );
};
