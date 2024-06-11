import React, { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./UserActiveRequest.module.css";

import { ButtonControl } from "../../ui";
import { dateToString } from "../../shared/dateConverter";
import { createPortal } from "react-dom";

import { CancelModal } from "./CancelModal";
import { ChangeDateModal } from "./ChangeDateModal";


export const UserActiveRequest = ({ request, triggerRefresh }) => {
    const formatDate = useCallback(() => dateToString(new Date(request.tourInstance.startDate)), [request.tourInstance.startDate]);

    const tourId = useMemo(() => request.tourInstance.tourBase._id, [request.tourInstance.tourBase._id]);
    const tourName = useMemo(() => request.tourInstance.tourBase.name, [request.tourInstance.tourBase.name]);
    const status = useMemo(() => request.status, [request.status]);
    const statusMessage = useMemo(() => request.statusMessage, [request.statusMessage]);

    const [showChangeDateModal, setShowChangeDateModal] = useState(false);

    const openChangeDateModal = useCallback(() => {
        setShowChangeDateModal(true);
    }, []);

    const closeChangeDateModal = useCallback(() => {
        setShowChangeDateModal(false);
    }, []);

    const [showCancelModal, setShowCancelModal] = useState(false);

    const openCancelModal = useCallback(() => {
        setShowCancelModal(true);
    }, []);

    const closeCancelModal = useCallback(() => {
        setShowCancelModal(false);
    }, []);

    return (
        <tr>
            {showChangeDateModal && createPortal(<ChangeDateModal request={request} triggerRefresh={triggerRefresh} show={showChangeDateModal} onHide={closeChangeDateModal} />,
                document.getElementById("modal-placement"))}
            {showCancelModal && createPortal(<CancelModal id={request._id} triggerRefresh={triggerRefresh} show={showCancelModal} onHide={closeCancelModal} />,
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
                    <ButtonControl onClick={openChangeDateModal}>Change date</ButtonControl>
                    {
                        status !== "Rejected" &&
                        <ButtonControl onClick={openCancelModal}>Cancel</ButtonControl>
                    }
                </div>
            </td>

        </tr>
    );
};
