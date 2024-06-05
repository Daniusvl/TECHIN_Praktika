import React, { useCallback } from "react";
import { Select } from "../../ui";
import { setArgs } from "../../shared/api/tourBaseModel";

export const SortOrder = ({setValue}) => {

    const onChange = useCallback((event) => {
        setValue(event.target.value);
        setArgs({desc: event.target.value});
    }, [setValue]);

    return (
        <Select onChange={onChange}>
            <option value="false" selected>Ascending</option>
            <option value="true">Descending</option>
        </Select>
    );
};
