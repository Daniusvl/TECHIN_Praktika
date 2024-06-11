import React from "react";
import { AdminHistoryRequest } from "../../components";
import { Table } from "../../ui";

import styles from "./AdminHistoryRequests.module.css";

export const AdminHistoryRequests = ({list}) => {
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
                </tr>
            </thead>
            <tbody>
                {list.map(v => <AdminHistoryRequest key={v._id} request={v}/>)}
            </tbody>
        </Table>
    );
};
