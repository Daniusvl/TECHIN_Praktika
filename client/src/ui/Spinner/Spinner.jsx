import React from "react";

import BSpinner from "react-bootstrap/Spinner";

export const Spinner = ({className}) => {
    return (
        <BSpinner
            className={className}
            style={{width: "500px"}}
            animation="border"
            role="status"
        />
    );
};
