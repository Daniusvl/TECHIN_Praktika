import React, { useCallback, useState } from "react";
import { Modal, ButtonControl } from "../../ui";

import BModal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FormGroup } from "../FormGroup/FormGroup";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./RejectRequestModal.module.css";
import { tourCandidateModel } from "../../shared/api/tourCandidateModel";
import { ServerSideErrorAlert } from "../ServerSideErrorAlert/ServerSideErrorAlert";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";

export const RejectRequestModal = ({id, triggerRefresh, ...args}) => {

    const {
        register,
        setError,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm();

    const navigate = useNavigate();
    const location = useLocation();


    const [isLoading, setIsLoading] = useState(false);

    const [isServerSideError, setIsServerSideError] = useState(false);
    const [isError, setIsError] = useState(undefined);

    const onFormSubmit = useCallback(async (formData) => {
        setIsLoading(true);

        const body = {
            tourCandidateId: id,
            statusMessage: formData.statusMessage
        };

        const {status, data} = await tourCandidateModel.rejectRequest(body);
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
            if(data.errors){
                const errors = data.errors;
                for (let i = 0; i < errors.length; i++) {
                    setError(errors[i].path, {
                        message: errors[i].msg
                    });
                }
            }
            else if(data.message){
                setIsError(data.message);
            }
        }
        else if(status === 500){
            setIsServerSideError(true);
        }


        setIsLoading(false);
    }, [id, location.pathname, navigate, triggerRefresh, setError]);

    return (
        <Modal {...args}>

            {isServerSideError && ServerSideErrorAlert()}
            {isError && ErrorAlert(isError)}

            <Form onSubmit={handleSubmit(onFormSubmit)}>
                <BModal.Header className={styles.bg}>Reject request</BModal.Header>
                
                <BModal.Body className={styles.bg}>
                    <FormGroup label="Reject reason" placeholder="enter text..." type="text" 
                        register={register("statusMessage")} errors={errors.statusMessage}/>
                </BModal.Body>

                <BModal.Footer className={styles.bg}>
                    <ButtonControl isLoading={isLoading}>Reject</ButtonControl>
                </BModal.Footer>
            </Form>
        </Modal>
    );
};
