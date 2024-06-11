import React, { useCallback, useMemo, useState } from "react";
import { dateToString } from "../../shared/dateConverter";
import { Link } from "react-router-dom";
import { ButtonControl } from "../../ui";
import { createPortal } from "react-dom";
import { ReviewModal } from "./ReviewModal";

export const UserHistoryRequest = ({request, triggerRefresh}) => {

    const formatDate = useCallback(() => dateToString(new Date(request.tourInstance.startDate)), [request.tourInstance.startDate]);

    const tourId = useMemo(() => request.tourInstance.tourBase._id, [request.tourInstance.tourBase._id]);
    const tourName = useMemo(() => request.tourInstance.tourBase.name, [request.tourInstance.tourBase.name]);
    const status = useMemo(() => request.status, [request.status]);
    const statusMessage = useMemo(() => request.statusMessage, [request.statusMessage]);

    const [showReviewModal, setShowReviewModal] = useState(false);

    const openReviewModal = useCallback(() => {
        setShowReviewModal(true);
    }, []);

    const closeReviewModal = useCallback(() => {
        setShowReviewModal(false);
    }, []);

    return (
        <tr>
            {showReviewModal && createPortal(<ReviewModal id={request._id} triggerRefresh={triggerRefresh} 
                show={showReviewModal} onHide={closeReviewModal} />, document.getElementById("modal-placement"))}
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
                {
                    status === "Approved" && !request.score &&
                    <ButtonControl onClick={openReviewModal}>Leave review</ButtonControl>
                }
            </td>
        </tr>
    );
};
