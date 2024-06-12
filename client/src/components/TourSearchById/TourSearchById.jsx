import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import { FormGroup } from "../FormGroup/FormGroup";
import { ButtonControl } from "../../ui";

import styles from "./TourSearchById.module.css";
import { tourBaseModel } from "../../shared/api/tourBaseModel";

export const TourSearchById = ({setTour, searchValue, setSearchValue}) => {

    const {
        register,
        setError,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm();

    const onChange = useCallback((event) => {
        setSearchValue(event.target.value);
        if(event.target.value.length === 0){
            setTour(undefined);
        }
    }, [setSearchValue, setTour]);

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const onSubmit = useCallback(async (formData) => {
        setIsLoading(true);
        
        const {status, data} = await tourBaseModel.getTourBaseById(formData.id);

        if(status === 200){
            data.price = data.price/100;
            setTour(data);
            setIsLoading(false);
            return;
        }
        else if (status === 401){
            navigate("/login", {state:{redirect: location.pathname}});
        }
        else if(status === 404){
            setError("id", {
                type:"manual",
                message: "Could not find tour with specified id"
            });
        }
        else if(status === 400){
            const errors = data.errors;
            for (let i = 0; i < errors.length; i++) {
                setError("id", {
                    message: errors[i].msg
                });
            }
        }
        setTour(undefined);
        setIsLoading(false);
    }, [setTour, setError, navigate, location.pathname]);

    return (
        <Form className={styles.main} onSubmit={handleSubmit(onSubmit)}>
            <FormGroup label="Tour id" placeholder="CF80BACA4CC1AC77C91136EC..." type="text" 
                register={register("id")} errors={errors.id} onChange={onChange} value={searchValue} />
            <ButtonControl isLoading={isLoading}>Search</ButtonControl>
        </Form>
    );
};
