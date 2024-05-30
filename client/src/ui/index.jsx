import { ButtonControl } from "./ButtonControl/ButtonControl";
import { InputControl } from "./InputControl/InputControl";
import { createPortal } from "react-dom";
import { AlertBase } from "./AlertBase/AlertBase";

export const DisplayServerSideErrorAlert = () => createPortal(
    (
        <AlertBase variant="danger" heading="Server side error">
            <p>Unknown error occured on the server. Please try again later</p>
        </AlertBase>
    ), document.getElementById("alert-placement"));

export {
    ButtonControl,
    InputControl,
    AlertBase,
};