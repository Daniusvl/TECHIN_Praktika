import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { tourDates } from "../../shared/api/tourDates";
import { dateToString } from "../../shared/dateConverter";

import { ButtonControl, Spinner } from "../../ui";
import styles from "./AdminTourDates.module.css";
import { CreateNewDateModal } from "./CreateNewDateModal";
import { RemoveDate } from "./RemoveDate";

export const AdminTourDates = ({tour}) => {

    const [dates, setDates] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [triggerRefresh, setTriggerRefresh] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true);

            if(!tour){
                setDates([]);
                setIsLoading(false);
                return;
            }

            const { data } = await tourDates.getDates(tour._id);
            data.map(v => {
                const result = v;
                result.startDate = dateToString(new Date(v.startDate));
                return result;
            });
            setDates(data);
            setIsLoading(false);
        })();
    }, [tour, triggerRefresh]);

    const [showCreateDateModal, setShowCreateDateModal] = useState(false);

    const openCreateDateModal = useCallback(() => {
        setShowCreateDateModal(true);
    }, []);

    const closeCreateDateModal = useCallback(() => {
        setShowCreateDateModal(false);
    }, []);

    return (
        <div className={styles.main}>
            {showCreateDateModal && createPortal(<CreateNewDateModal tourId={tour._id} triggerRefresh={setTriggerRefresh} 
                show={showCreateDateModal} closeSelf={closeCreateDateModal} onHide={closeCreateDateModal} />,
            document.getElementById("modal-placement"))}
            <div className={styles.dates}>
                {
                    isLoading && 
                    <div className={styles.defaultContainer}>
                        <Spinner className={styles.spinner} />
                    </div>
                }
                {
                    !isLoading && dates.length > 0 &&
                    dates.map(v => 
                        <div key={v._id} className={styles.date}>
                            <div>
                                {v.startDate}
                            </div>
                            <RemoveDate key={`btn_${v._id}`} id={v._id} triggerRefresh={setTriggerRefresh} />
                        </div>
                    )
                }
                {
                    tour && dates.length === 0 && !isLoading &&
                    <>
                        This tour doesnt have any dates
                    </>
                }
                {
                    !tour && !isLoading &&
                    <>
                        Enter tour id
                    </>
                }
            </div>
            <div>
                <ButtonControl onClick={openCreateDateModal} disabled={!tour}>Add new</ButtonControl>
            </div>
        </div>
    );
};
