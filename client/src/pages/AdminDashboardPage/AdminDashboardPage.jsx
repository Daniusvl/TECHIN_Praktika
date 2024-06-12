import React, { useState } from "react";
import { AdminRequestsPage, DashboardNavigation, TourAdministration } from "../../models";

import styles from "./AdminDashboardPage.module.css";

const AdminDashboardPage = () => {
    // 1 requests, 2 tours
    const [navigation, setNavigation] = useState(1);

    return (
        <div>
            <div className={styles.nav}>
                <DashboardNavigation navigation={navigation} setNavigation={setNavigation} links={["Requests", "Tours"]} />
            </div>
            <div>
                {
                    navigation === 1 &&
                    <AdminRequestsPage />
                }
                {
                    navigation === 2 && 
                    <TourAdministration />
                }
            </div>
        </div>
    );
};

export default AdminDashboardPage;