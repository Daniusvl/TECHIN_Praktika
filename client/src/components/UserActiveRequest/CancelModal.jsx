import React, { useCallback, useState } from "react";
import { Modal, ButtonControl } from "../../ui";

import BModal from "react-bootstrap/Modal";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./CancelModal.module.css";
import { tourCandidateModel } from "../../shared/api/tourCandidateModel";
import { ServerSideErrorAlert } from "../ServerSideErrorAlert/ServerSideErrorAlert";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";

export const CancelModal = ({id, triggerRefresh, ...args}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(false);

    const [isServerSideError, setIsServerSideError] = useState(false);
    const [isError, setIsError] = useState(undefined);

    const onSubmit = useCallback(async () => {
        setIsLoading(true);

        const {status, data} = await tourCandidateModel.cancelRequest(id);
        if(status === 200){
            triggerRefresh(v => !v);
        }
        else if(status === 401){
            navigate("/login", {state:{redirect: location.pathname}});
        }
        else if(status === 404){
            setIsError(data.message);
        }
        else if(status === 400){
            setIsError(data.message);
        }
        else if(status === 500){
            setIsServerSideError(true);
        }


        setIsLoading(false);
    }, [id, location.pathname, navigate, triggerRefresh]);

    return (
        <Modal {...args}>

            {isServerSideError && ServerSideErrorAlert()}
            {isError && ErrorAlert(isError)}

            <BModal.Header className={styles.bg}>Cancel request?</BModal.Header>
   
            <BModal.Body className={styles.bg}>
                <div>Are you sure you want to cancel the request?</div>
            </BModal.Body>

            <BModal.Footer className={styles.bg}>
                <ButtonControl isLoading={isLoading} onClick={onSubmit}>Cancel</ButtonControl>
            </BModal.Footer>
        </Modal>
    );
};
