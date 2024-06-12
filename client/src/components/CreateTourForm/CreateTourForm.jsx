import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import styles from "./CreateTourForm.module.css";

import { useLocation, useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import { FormGroup } from "../FormGroup/FormGroup";
import { ButtonControl, InputControl } from "../../ui";
import { tourBaseModel } from "../../shared/api/tourBaseModel";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";
import { SuccessAlert } from "../SuccessAlert/SuccessAlert";

export const CreateTourForm = () => {
    const {
        register,
        setError,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm();

    const location = useLocation();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const [isError, setIsError] = useState(false); 
    const [isSuccess, setIsSuccess] = useState(false);

    const [tourId, setTourId] = useState(false);

    const onSubmit = useCallback(async (formData) => {
        setIsError(false);
        setIsSuccess(false);
        setIsLoading(true);
        
        const body = {
            ...formData
        };
        if(!body.image){
            delete body.image;
        }
        else{
            body.image = body.image[0];
        }
        const {status, data} = await tourBaseModel.createTour(body);

        if(status === 201){
            setTourId(data._id);
            setIsSuccess(true);
        }
        else if (status === 400){
            const errors = data.errors;
            for (let i = 0; i < errors.length; i++) {
                if(errors[i].path === "imgPath"){
                    setError("image", {
                        message: errors[i].msg
                    });
                }
                else{
                    setError(errors[i].path, {
                        message: errors[i].msg
                    });
                }
            }
        }
        else if(status === 401){
            navigate("/login", {state:{redirect: location.pathname}});
        }
        else if(status === 409 || status === 500){
            setIsError(data.message);
        }

        setIsLoading(false);
    }, [navigate, setError, location.pathname]);

    return (
        <div className={styles.main}>

            {isError && ErrorAlert(isError)}
            {isSuccess && SuccessAlert(`Successfuly created tour with id: ${tourId}`)}

            <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

                <FormGroup classes={styles.input} type="text" label="Name" 
                    placeholder="(3-50) characters" register={register("name", {
                        required: true
                    })} 
                    errors={errors.name} />

                <FormGroup as="textarea" rows={5} label="Description" 
                    placeholder="(3-500) characters" register={register("description", {
                        required: true
                    })} 
                    errors={errors.description} />

                <FormGroup type="text" label="Price" placeholder="(0-100000) $" 
                    register={register("price", {
                        required: true
                    })} errors={errors.price} />

                <FormGroup type="text" label="Duration" placeholder={`(1-${24*7}) hours`} 
                    register={register("durationInHours", {
                        required: true
                    })} errors={errors.durationInHours} />

                <Form.Group className="mb-3">
                    <div>
                        <input type="checkbox" {...register("isSingle")}/>
                        <span> Check if its for single person</span>
                    </div>
                    <Form.Text muted>{errors.isSingle && errors.isSingle.message}</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>{"image"}</Form.Label>
                    <InputControl type="file" register={register("image", {
                        required: true
                    })} />
                    <Form.Text muted>{errors.image && errors.image.message}</Form.Text>
                </Form.Group>
                <ButtonControl isLoading={isLoading}>Create</ButtonControl>
            </Form>
        </div>
    );
};
