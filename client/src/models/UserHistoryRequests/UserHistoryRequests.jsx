import React from "react";
import { UserHistoryRequest } from "../../components";
import { Table } from "../../ui";

import styles from "./UserHistoryRequests.module.css";

export const UserHistoryRequests = ({list, triggerRefresh}) => {
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
                {list.map(v => <UserHistoryRequest key={v._id} request={v} triggerRefresh={triggerRefresh}/>)}
            </tbody>
        </Table>
    );
};
