import React from "react";
import { AdminActiveRequest } from "../../components";
import { Table } from "../../ui";

import styles from "./AdminActiveRequests.module.css";

export const AdminActiveRequests = ({list, triggerRefresh}) => {
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
                        User
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
                {list.map(v => <AdminActiveRequest key={v._id} request={v} triggerRefresh={triggerRefresh} />)}
            </tbody>
        </Table>
    );
};
