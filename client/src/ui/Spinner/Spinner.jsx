import React from "react";

import BSpinner from "react-bootstrap/Spinner";

export const Spinner = ({className}) => {
    return (
        <BSpinner
            className={className}
            animation="border"
            role="status"
        />
    );
};
