import React from "react";

import { Table } from "../../ui";

import styles from "./UserActiveRequests.module.css";
import { UserActiveRequest } from "../../components";

export const UserActiveRequests = ({list, triggerRefresh}) => {
    return (
        <Table classes={styles.main}>
            <thead>
                <tr>
                    <th>
                        Tour
                    </th>
                    <th>
                        Date
                    </th>
                    <th>
                        Status
                    </th>
                    <th>
                        Status message
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {list.map(v => <UserActiveRequest key={v._id} request={v} triggerRefresh={triggerRefresh} />)}
            </tbody>
        </Table>
    );
};
