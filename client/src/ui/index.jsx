import { ButtonControl } from "./ButtonControl/ButtonControl";
import { InputControl } from "./InputControl/InputControl";
import { createPortal } from "react-dom";
import { AlertBase } from "./AlertBase/AlertBase";
import { Input } from "./Input/Input";
import { Select } from "./Select/Select";
import { FilterCategory } from "./FilterCategory/FilterCategory";
import { MultiRangeSlider } from "./MultiRangeSlider/MultiRangeSlider";
import { CardItem } from "./CardItem/CardItem";
import { PaginationItem } from "./PaginationItem/PaginationItem";

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
    Input,
    Select,
    FilterCategory,
    MultiRangeSlider,
    CardItem,
    PaginationItem
};