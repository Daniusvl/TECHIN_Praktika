import React, { useCallback } from "react";
import { Select } from "../../ui";
import { setArgs } from "../../shared/api/tourBaseModel";

export const SortBy = ({setValue}) => {

    const onChange = useCallback((event) => {
        setValue(event.target.value);
        setArgs({sortBy: event.target.value});
    }, [setValue]);

    return (
        <Select onChange={onChange}>
            <option value="name" selected>Name</option>
            <option value="price">Price</option>
            <option value="isSingle">Type</option>
            <option value="avgScore">Score</option>
            <option value="durationInHours">Duration</option>
        </Select>
    );
};
