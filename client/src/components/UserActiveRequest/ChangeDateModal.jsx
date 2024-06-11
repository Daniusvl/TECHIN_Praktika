import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, ButtonControl, Select } from "../../ui";

import Form from "react-bootstrap/Form";

import BModal from "react-bootstrap/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./CancelModal.module.css";
import { tourCandidateModel } from "../../shared/api/tourCandidateModel";
import { ServerSideErrorAlert } from "../ServerSideErrorAlert/ServerSideErrorAlert";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";
import { tourDates } from "../../shared/api/tourDates";
import { dateToString } from "../../shared/dateConverter";

export const ChangeDateModal = ({request, triggerRefresh, ...args}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        setError,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm();

    const [isLoading, setIsLoading] = useState(false);

    const [isServerSideError, setIsServerSideError] = useState(false);
    const [isError, setIsError] = useState(undefined);

    const [dates, setDates] = useState([]);

    useEffect(() => {
        (async () => {
            const {status, data} = await tourDates.getDates(request.tourInstance.tourBase._id);
            if(status === 200){
                setDates(data.filter(v => v._id !== request.tourInstance._id));
            }
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = useCallback(async (formData) => {
        setIsLoading(true);

        if(formData.date === "default"){
            setError("date", { type: "manual", message: "You must select a date" });
            setIsLoading(false);
            return;
        }

        const body = {
            tourCandidateId: request._id,
            tourInstanceId: formData.date
        };

        const {status, data} = await tourCandidateModel.changeDate(body);
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
    }, [location.pathname, navigate, triggerRefresh, request._id, setError]);

    const getDates = useCallback((dates) => {

        return dates.map(t => {
            return {startDate: new Date(t.startDate), id: t._id};
        })
            .map(v => {
                return {
                    id: v.id,
                    startDate: dateToString(v.startDate)
                };
            });
    }, []);

    return (
        <Modal {...args}>

            {isServerSideError && ServerSideErrorAlert()}
            {isError && ErrorAlert(isError)}

            <BModal.Header className={styles.bg}>Change date</BModal.Header>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <BModal.Body className={styles.bg}>
                    <div className={styles.txt}>Once you change the date request status will become: Processing</div>
                    
                    <Form.Group className="mb-3">

                        <Form.Label>Select date</Form.Label>

                        <Select defaultValue="default" register={register("date")}>
                            <option value="default">-- select --</option>
                            {getDates(dates).map(v => <option key={v.id} value={v.id}>{v.startDate}</option>)}
                        </Select>

                        <Form.Text muted>{errors && errors.date && errors.date.message}</Form.Text>

                    </Form.Group>
                </BModal.Body>

                <BModal.Footer className={styles.bg}>
                    <ButtonControl isLoading={isLoading}>Apply</ButtonControl>
                </BModal.Footer>
            </Form>            

        </Modal>
    );
};
