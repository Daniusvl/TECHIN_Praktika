import { ButtonControl } from "./ButtonControl/ButtonControl";
import { InputControl } from "./InputControl/InputControl";
import { ServerSideErrorAlert } from "./ServerSideErrorAlert/ServerSideErrorAlert";
import { createPortal } from "react-dom";
import { AlertBase } from "./AlertBase/AlertBase";

export const DisplayServerSideErrorAlert = () => createPortal(<ServerSideErrorAlert />, document.getElementById("alert-placement"));

export {
    ButtonControl,
    InputControl,
    AlertBase,
};