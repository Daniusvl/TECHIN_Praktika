import React, {useEffect, useState} from "react";

import { DashboardNavigation, DashboardPagination, UserActiveRequests, UserHistoryRequests } from "../../models";
import { Spinner } from "../../ui";

import styles from "./UserDashboardPage.module.css";
import { tourCandidateModel } from "../../shared/api/tourCandidateModel";

const UserDashboardPage = () => {

    const [isLoading, setIsLoading] = useState(true);

    // 1 active, 2 history
    const [navigation, setNavigation] = useState(1);

    const [activeList, setActiveList] = useState([]);
    const [historyList, setHistoryList] = useState([]);

    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);

    const [isRefreshed, setIsRefreshed] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            if(navigation === 1){
                const {status, data} = await tourCandidateModel.showMyActiveRequests();
                if(status === 200){
                    setActiveList(data);
                }

            }
            else if(navigation === 2){
                const {status, data} = await tourCandidateModel.showMyHistoryRequests(page);
                if(status === 200){
                    setHistoryList(data.data);
                    setPageCount(data.pageCount);
                    setPage(1);
                }
            }
            setIsLoading(false);
        })();
    }, [navigation, page, isRefreshed]);

    return (
        <div>
            <DashboardNavigation navigation={navigation} setNavigation={setNavigation} />
            {
                navigation === 2 &&
                <div>
                    <DashboardPagination activePage={page} setPage={setPage} lastPage={pageCount} />
                </div>
            }
            <div className={styles.mainContent}>
                {
                    isLoading && 
                    <div className={styles.defaultContainer}>
                        <Spinner className={styles.spinner} />
                    </div>
                }
                {
                    navigation === 1 && !isLoading && activeList.length === 0 && 
                    <div className={styles.defaultContainer}>
                        <p>No active requests found</p>
                    </div>
                }
                {
                    navigation === 2 && !isLoading && historyList.length === 0 && 
                    <div className={styles.defaultContainer}>
                        <p>Request history not found</p>
                    </div>
                }

                {navigation === 1 && !isLoading && activeList.length > 0 && <UserActiveRequests list={activeList} triggerRefresh={setIsRefreshed} />}
                {navigation === 2 && !isLoading && historyList.length > 0 && <UserHistoryRequests list={historyList} triggerRefresh={setIsRefreshed} />}
            </div>
        </div>
    );
};

export default UserDashboardPage;