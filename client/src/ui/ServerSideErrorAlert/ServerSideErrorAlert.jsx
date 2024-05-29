import React from "react";
import Alert from "react-bootstrap/Alert";

export const ServerSideErrorAlert = () => {
    return (
        <Alert variant="danger" dismissible>
            <Alert.Heading>Server side error</Alert.Heading>
            <p>Unknown error occured on the server. Please try again later</p>
        </Alert>
    );
};
