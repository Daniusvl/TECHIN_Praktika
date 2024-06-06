import React, { useCallback, useState } from "react";
import { ButtonControl, Select } from "../../ui";

import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import styles from "./TourRegistrationForm.module.css";
import { dateToString } from "../../shared/dateConverter";
import { tourCandidateModel } from "../../shared/api/tourCandidateModel";
import { useNavigate, useLocation } from "react-router-dom";
import { ServerSideErrorAlert } from "../ServerSideErrorAlert/ServerSideErrorAlert";
import { SuccessAlert } from "../SuccessAlert/SuccessAlert";

export const TourRegistrationForm = ({ tour }) => {

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

    const [serverSideError, setServerSideError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    const getDates = useCallback((tour) => {

        return tour.tourInstances.map(t => {
            return {startDate: new Date(t.startDate), id: t._id};
        })
            .filter(v => v.startDate > new Date())
            .map(v => {
                return {
                    id: v.id,
                    startDate: dateToString(v.startDate)
                };
            });
    }, []);

    const onSubmit = useCallback(async (form) => {
        const { date } = form;

        if(date === "default"){
            setError("date", { type: "manual", message: "You must select a date" });
            return;
        }

        const {status, data} = await tourCandidateModel.apply(date);
        if(status === 201){
            setIsSuccess(true);
        }
        else if(status === 401){
            navigate("/login", {state:{redirect: location.pathname}});
        }
        else if(status === 400 || status === 404 || status === 409){
            setError("date", {
                type: "manual",
                message: data.message
            });
        }
        else if(status === 500){
            setServerSideError(true);
        }

    }, [setError, navigate, location.pathname]);

    return (
        <div className={styles.form}>
            {serverSideError && ServerSideErrorAlert()}
            {isSuccess && SuccessAlert("Successfuly applied for tour")}

            <Form onSubmit={handleSubmit(onSubmit)}>

                <Form.Group className="mb-3">

                    <Form.Label>Select date</Form.Label>

                    <Select defaultValue="default" register={register("date")}>
                        <option value="default">-- select --</option>
                        {getDates(tour).map(v => <option key={v.id} value={v.id}>{v.startDate}</option>)}
                    </Select>

                    <Form.Text className={styles.errorText} muted>{errors && errors.date && errors.date.message}</Form.Text>

                </Form.Group>

                <ButtonControl>Apply</ButtonControl>
            </Form>
        </div>
    );
};
