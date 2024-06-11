import React, { useEffect, useState } from "react";
import { AdminActiveRequests, AdminHistoryRequests, DashboardNavigation, DashboardPagination } from "../../models";
import { tourCandidateModel } from "../../shared/api/tourCandidateModel";

import styles from "./AdminDashboardPage.module.css";
import Spinner from "react-bootstrap/esm/Spinner";

const AdminDashboardPage = () => {

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
                const {status, data} = await tourCandidateModel.showAllActiveRequests(page);
                if(status === 200){
                    setActiveList(data.data);
                    setPageCount(data.pageCount);
                    setPage(1);
                }

            }
            else if(navigation === 2){
                const {status, data} = await tourCandidateModel.showAllHistoryRequests(page);
                if(status === 200){
                    setHistoryList(data.data);
                    setPageCount(data.pageCount);
                    setPage(1);
                }
            }
            setIsLoading(false);
        })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation, page, isRefreshed]);

    return (
        <div>
            <DashboardNavigation navigation={navigation} setNavigation={setNavigation} />
            <div>
                <DashboardPagination activePage={page} setPage={setPage} lastPage={pageCount} />
            </div>
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
                        <p>No active requests left</p>
                    </div>
                }
                {
                    navigation === 2 && !isLoading && historyList.length === 0 && 
                    <div className={styles.defaultContainer}>
                        <p>Request history not found</p>
                    </div>
                }

                {navigation === 1 && !isLoading && <AdminActiveRequests list={activeList} triggerRefresh={setIsRefreshed} />}
                {navigation === 2 && !isLoading && <AdminHistoryRequests list={historyList}/>}
            </div>
        </div>
    );
};

export default AdminDashboardPage;