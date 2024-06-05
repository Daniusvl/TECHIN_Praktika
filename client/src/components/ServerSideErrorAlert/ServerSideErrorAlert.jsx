import React from "react";
import { createPortal } from "react-dom";
import { AlertBase } from "../../ui";

export const ServerSideErrorAlert = () => createPortal(
    (
        <AlertBase variant="danger" heading="Server side error">
            <p>Unknown error occured on the server. Please try again later</p>
        </AlertBase>
    ), document.getElementById("alert-placement"));
