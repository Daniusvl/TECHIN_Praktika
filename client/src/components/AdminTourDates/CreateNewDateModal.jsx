import React, { useCallback, useState } from "react";
import { Modal, ButtonControl } from "../../ui";

import BModal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FormGroup } from "../FormGroup/FormGroup";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import { ServerSideErrorAlert } from "../ServerSideErrorAlert/ServerSideErrorAlert";
import styles from "./CreateNewDateModal.module.css";
import { tourDates } from "../../shared/api/tourDates";

export const CreateNewDateModal = ({ tourId, triggerRefresh, closeSelf, ...args }) => {

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

    const onFormSubmit = useCallback(async (formData) => {
        setIsLoading(true);

        const body = {
            tourBaseId: tourId,
            startDate: formData.startDate
        };

        const {status, data} = await tourDates.createDate(body);
        if(status === 201){
            triggerRefresh(v => !v);
            closeSelf();
        }
        else if(status === 401){
            navigate("/login", {state:{redirect: location.pathname}});
        }
        else if(status === 404 || status === 409){
            setError("startDate", {
                message: data.message
            });
        }
        else if(status === 400){
            const errors = data.errors;
            for (let i = 0; i < errors.length; i++) {
                setError(errors[i].path, {
                    message: errors[i].msg
                });
            }
        }
        else if(status === 500){
            setIsServerSideError(true);
        }


        setIsLoading(false);
    }, [location.pathname, navigate, triggerRefresh, setError, tourId, closeSelf]);

    return (
        <Modal {...args}>

            {isServerSideError && ServerSideErrorAlert()}

            <Form onSubmit={handleSubmit(onFormSubmit)}>
                <BModal.Header className={styles.bg}>Add new date</BModal.Header>
                
                <BModal.Body className={styles.bg}>
                    <FormGroup label="Date" placeholder="yyyy-MM-dd hh:mm" type="text" 
                        register={register("startDate")} errors={errors.startDate}/>
                </BModal.Body>

                <BModal.Footer className={styles.bg}>
                    <ButtonControl isLoading={isLoading}>Create</ButtonControl>
                </BModal.Footer>
            </Form>
        </Modal>
    );
};
