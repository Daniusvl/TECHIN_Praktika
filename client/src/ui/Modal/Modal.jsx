import React from "react";

import BModal from "react-bootstrap/Modal";

export const Modal = ({children, ...args}) => {
    return (
        <BModal {...args}>
            {children}
        </BModal>
    );
};
