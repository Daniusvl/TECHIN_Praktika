import React, { useState } from "react";

import { CreateTourForm, EditTourForm, TourSearchById, AdminTourDates } from "../../components";
import { DashboardNavigation } from "../DashboardNavigation/DashboardNavigation";

import styles from "./TourAdministration.module.css";

export const TourAdministration = () => {
    
    const [tour, setTour] = useState();
    const [searchValue, setSearchValue] = useState("");

    // 1 new, 2 edit, 3 dates
    const [navigation, setNavigation] = useState(1);

    return (
        <div>
            <div className={styles.nav}>
                <DashboardNavigation navigation={navigation} setNavigation={setNavigation} links={["Create tour", "Edit tour", "Dates"]} />
            </div>
            {
                navigation === 1 &&
                <CreateTourForm />
            }
            {
                navigation === 2 && <>
                    <div>
                        <TourSearchById setTour={setTour} searchValue={searchValue} setSearchValue={setSearchValue} />
                    </div>
                    <EditTourForm tour={tour} setTour={setTour} setSearchValue={setSearchValue} />
                </>
            }
            {
                navigation === 3 && 
                <>
                    <div>
                        <TourSearchById setTour={setTour} searchValue={searchValue} setSearchValue={setSearchValue} />
                    </div>
                    <AdminTourDates tour={tour} />
                </>
            }

        </div>
    );
};
