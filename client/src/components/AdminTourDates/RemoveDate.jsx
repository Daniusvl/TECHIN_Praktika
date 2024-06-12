import React, { useCallback, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { tourDates } from "../../shared/api/tourDates";

import { ButtonControl } from "../../ui";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";
import styles from "./RemoveDate.module.css";

export const RemoveDate = ({id, triggerRefresh}) => {

    const navigate = useNavigate();
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const removeDate = useCallback(async () => {
        setIsLoading(true);
        const {status, data} = await tourDates.deleteDate(id);

        if(status === 200){
            setIsLoading(false);
            triggerRefresh(v => !v);
            return;
        }
        else if(status === 401){
            navigate("/login", {state:{redirect: location.pathname}});
        }
        else if(status === 404 || status === 500){
            setIsError(data.message);
        }

        setIsLoading(false);
    }, [navigate, location.pathname, id, triggerRefresh]);

    return (
        <div className={styles.btn}>
            {
                isError && ErrorAlert(isError)
            }
            <ButtonControl onClick={removeDate} isLoading={isLoading}>Remove</ButtonControl>
        </div>
    );
};
