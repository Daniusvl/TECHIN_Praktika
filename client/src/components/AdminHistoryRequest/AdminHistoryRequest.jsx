import React, { useCallback, useMemo } from "react";
import { dateToString } from "../../shared/dateConverter";
import { Link } from "react-router-dom";

export const AdminHistoryRequest = ({request}) => {

    const formatDate = useCallback(() => dateToString(new Date(request.tourInstance.startDate)), [request.tourInstance.startDate]);

    const tourId = useMemo(() => request.tourInstance.tourBase._id, [request.tourInstance.tourBase._id]);
    const tourName = useMemo(() => request.tourInstance.tourBase.name, [request.tourInstance.tourBase.name]);
    const userMail = useMemo(() => request.user.email, [request.user.email]);
    const status = useMemo(() => request.status, [request.status]);
    const statusMessage = useMemo(() => request.statusMessage, [request.statusMessage]);

    return (
        <tr>
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
        </tr>
    );
};
