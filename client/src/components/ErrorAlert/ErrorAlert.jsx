import React from "react";
import { createPortal } from "react-dom";
import { AlertBase } from "../../ui";

export const ErrorAlert = (message) => createPortal(
    (
        <AlertBase variant="danger" heading="Success!">
            <p>{message}</p>
        </AlertBase>
    ), document.getElementById("alert-placement"));
