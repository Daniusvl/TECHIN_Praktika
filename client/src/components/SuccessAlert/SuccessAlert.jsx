import React from "react";
import { createPortal } from "react-dom";
import { AlertBase } from "../../ui";

export const SuccessAlert = (message) => createPortal(
    (
        <AlertBase variant="success" heading="Success!">
            <p>{message}</p>
        </AlertBase>
    ), document.getElementById("alert-placement"));
