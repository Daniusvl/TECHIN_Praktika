import React, { useState, useEffect, useCallback } from "react";
import { SearchBox, TourFilters, TourContent, TourContentHeader } from "../../models/index";

import Stack from "react-bootstrap/Stack";

import styles from "./HomePage.module.css";
import { tourBaseModel } from "../../shared/api/tourBaseModel";
import { classNames } from "../../shared/classNames.mjs";

const HomePage = () => {

    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("false");

    const [triggerFilters, setTriggerFilters] = useState(false);
    const [filtersLoading, setFiltersLoading] = useState(false);
    const [filtersSaved, setFiltersSaved] = useState(false);

    const [searchChanged, setSearchChanged] = useState(false);
    const [triggerSearch, setTriggerSearch] = useState(false);

    const [tours, setTours] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [toursLoading, setToursLoading] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [maxPriceValue, setMaxPriceValue] = useState(1);
    const [maxDurationValue, setMaxDurationValue] = useState(1);

    useEffect(() => {
        (async () => {
            setToursLoading(true);
            setTours([]);
            if(searchChanged){
                setCurrentPage(1);
                setSearchChanged(false);
            }

            if(filtersSaved){
                setCurrentPage(1);
                setFiltersLoading(true);
                setFiltersSaved(false);
            }

            const {status, data} = await tourBaseModel.getTourBases(currentPage);
            if(status === 200){
                setTours(data.data);
                setPageCount(data.pageCount);
                if(data.data.length > 0){
                    setMaxPriceValue(data.maxPrice/100);
                    setMaxDurationValue(data.maxDuration);
                }
            }

            setToursLoading(false);
            
            // maybe doesnt work after 1 try
            setFiltersLoading(false);
        })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [triggerSearch, sortBy, sortOrder, triggerFilters, currentPage]);

    const filtersSave = useCallback(() => {
        setTriggerFilters(v => !v);
        setFiltersSaved(true);
    }, [setTriggerFilters]);

    const searchSave = useCallback(() => {
        setSearchChanged(true);
        setTriggerSearch(v => !v);
    }, [setSearchChanged]);

    return (
        <Stack gap={3}>
            <div className={styles.itemPadding}>
                <SearchBox searchChanged={searchSave} />
            </div>
            <div className={classNames(styles.main, styles.itemPadding)}>
                <div className={styles.filters}>
                    <TourFilters saveLoading={filtersLoading} saveOnClick={filtersSave} maxPriceValue={maxPriceValue} maxDurationValue={maxDurationValue} />
                </div>
                <div className={styles.content}>
                    <TourContentHeader setSortBy={setSortBy} setSortOrder={setSortOrder} page={currentPage} setPage={setCurrentPage} lastPage={pageCount} />
                    <TourContent isLoading={toursLoading} tours={tours} />
                </div>
            </div>
        </Stack>
    );
};

export default HomePage;