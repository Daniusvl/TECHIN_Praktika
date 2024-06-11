import React, { useCallback, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import styles from "./AdminActiveRequest.module.css";

import { ButtonControl } from "../../ui";
import { dateToString } from "../../shared/dateConverter";
import { tourCandidateModel } from "../../shared/api/tourCandidateModel";
import { ServerSideErrorAlert } from "../ServerSideErrorAlert/ServerSideErrorAlert";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";
import { createPortal } from "react-dom";
import { RejectRequestModal } from "./RejectRequestModal";

export const AdminActiveRequest = ({ request, triggerRefresh }) => {
    const formatDate = useCallback(() => dateToString(new Date(request.tourInstance.startDate)), [request.tourInstance.startDate]);

    const navigate = useNavigate();
    const location = useLocation();

    const tourId = useMemo(() => request.tourInstance.tourBase._id, [request.tourInstance.tourBase._id]);
    const tourName = useMemo(() => request.tourInstance.tourBase.name, [request.tourInstance.tourBase.name]);
    const userMail = useMemo(() => request.user.email, [request.user.email]);
    const status = useMemo(() => request.status, [request.status]);
    const statusMessage = useMemo(() => request.statusMessage, [request.statusMessage]);

    const [isServerSideError, setIsServerSideError] = useState(false);
    const [isError, setIsError] = useState(undefined);

    const approve = useCallback(async () => {
        setIsServerSideError(false);
        setIsError(false);

        const {status, data} = await tourCandidateModel.approveRequest(request._id);

        if(status === 200){
            triggerRefresh(v => !v);
        }
        else if(status === 401){
            navigate("/login", {state:{redirect: location.pathname}});
        }
        else if(status === 404 || status === 400){
            setIsError(data.message);
        }
        else if(status === 500){
            setIsServerSideError(true);
        }

    }, [request._id, navigate, location.pathname, triggerRefresh]);

    const [showRejectModal, setShowRejectModal] = useState(false);

    const reject = useCallback(() => {
        setShowRejectModal(true);
    }, []);

    const closeRejectModal = useCallback(() => {
        setShowRejectModal(false);
    }, []);

    return (
        <tr>
            {isServerSideError && ServerSideErrorAlert()}
            {isError && ErrorAlert(isError)}
            {showRejectModal && createPortal(<RejectRequestModal id={request._id} triggerRefresh={triggerRefresh} show={showRejectModal} onHide={closeRejectModal} />,
                document.getElementById("modal-placement"))}
            <td title={tourName}>
                <Link to={`/tour/${tourId}`}>
                    {
                        tourName.length > 10 ? 
                            <>
                                {tourName.substr(0, 10)} ...
                            </> : 
                            <>{tourName}</>
                    }
                </Link>
            </td>
            <td>
                {formatDate()}
            </td>
            <td>
                {userMail}
            </td>
            <td>
                {status}
            </td>
            <td title={statusMessage}>
                {
                    statusMessage && statusMessage.length > 10 ? 
                        <>
                            {statusMessage.substr(0, 10)} ...
                        </> :
                        <>{statusMessage}</>
                }
            </td>
            <td>
                <div className={styles.actionContainer}>
                    <ButtonControl onClick={approve} disabled={status === "Approved"}>Approve</ButtonControl>
                    <ButtonControl onClick={reject}>Reject</ButtonControl>
                </div>
            </td>

        </tr>
    );
};
