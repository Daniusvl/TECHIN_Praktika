import React, { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import styles from "./EditTourForm.module.css";

import { useLocation, useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import { FormGroup } from "../FormGroup/FormGroup";
import { ButtonControl, InputControl } from "../../ui";
import { tourBaseModel } from "../../shared/api/tourBaseModel";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";
import { SuccessAlert } from "../SuccessAlert/SuccessAlert";

export const EditTourForm = ({tour, setTour, setSearchValue}) => {

    const defaultValues = useMemo(() => ({
        name: "",
        description: "",
        price: "",
        durationInHours: "",
        isSingle: false,
        image: {}
    }), []);

    const {
        register,
        setError,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm({values: tour ? tour : defaultValues});

    const location = useLocation();
    const navigate = useNavigate();

    const [editIsLoading, setEditIsLoading] = useState(false);

    const [isError, setIsError] = useState(false); 
    const [isSuccess, setIsSuccess] = useState(false);

    const [successMessage, setSuccessMessage] = useState("");

    const onSubmit = useCallback(async (formData) => {
        setIsError(false);
        setIsSuccess(false);
        setEditIsLoading(true);
        
        const body = {
            _id: tour._id,
            ...formData
        };
        if(!body.image){
            delete body.image;
        }
        else{
            body.image = body.image[0];
        }
        const {status, data} = await tourBaseModel.updateTour(body);

        if(status === 200){
            setSuccessMessage("Successfuly updated tour data");
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
        else if(status === 404 || status === 409 || status === 500){
            setIsError(data.message);
        }

        setEditIsLoading(false);
    }, [navigate, setError, location.pathname, tour]);
    
    const [removeIsLoading, setRemoveIsLoading] = useState(false);
    const removeTour = useCallback(async () => {
        setIsError(false);
        setIsSuccess(false);
        setRemoveIsLoading(true);

        const {status, data} = await tourBaseModel.deleteTour(tour._id);

        if(status === 200){
            setSearchValue("");
            setTour(defaultValues);
            setSuccessMessage("Successfuly removed tour data");
            setIsSuccess(true);
        }
        else if(status === 401){
            navigate("/login", {state:{redirect: location.pathname}});
        }
        else if(status === 500 || status === 404){
            setIsError(data.message);
        }

        setRemoveIsLoading(false);
    }, [navigate, location.pathname, tour, setSearchValue, setTour, defaultValues]);

    return (
        <div className={styles.main}>

            {isError && ErrorAlert(isError)}
            {isSuccess && SuccessAlert(successMessage)}

            <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

                <FormGroup classes={styles.input} type="text" label="Name" placeholder="(3-50) characters" register={register("name")} errors={errors.name} />

                <FormGroup as="textarea" rows={5} label="Description" placeholder="(3-500) characters" register={register("description")} errors={errors.description} />

                <FormGroup type="text" label="Price" placeholder="(0-100000) $" register={register("price")} errors={errors.price} />

                <FormGroup type="text" label="Duration" placeholder={`(1-${24*7}) hours`} register={register("durationInHours")} errors={errors.durationInHours} />

                <Form.Group className="mb-3">
                    <div>
                        <input type="checkbox" {...register("isSingle")}/>
                        <span> Check if its for single person</span>
                    </div>
                    <Form.Text muted>{errors.isSingle && errors.isSingle.message}</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>{"image *"}</Form.Label>
                    <InputControl type="file" register={register("image")} />
                    <Form.Text muted>{errors.image && errors.image.message}</Form.Text>
                </Form.Group>
                <div className={styles.buttons}>
                    <ButtonControl isLoading={editIsLoading} disabled={!tour}>Update</ButtonControl>
                    <ButtonControl type="button" onClick={removeTour} disabled={!tour} isLoading={removeIsLoading}>Remove</ButtonControl>
                </div>
            </Form>
        </div>
    );
};
