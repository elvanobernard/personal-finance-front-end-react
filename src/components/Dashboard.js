import React from "react";

import styles from "./Dashboard.module.css"
import Box from "./UI/Box";
import Button from "./UI/Button";
import DashboardItem from "./UI/DashboardItem";

function DashBoard(props) {
    return (
        <div className={styles.container}>
            <div className={styles["box-container"]}>
                <Box title="Summary" amount={234567} />
                <Box />
                <Box />
            </div>
            <div className={styles["dashboard-container"]}>
                <DashboardItem />
                <DashboardItem />
                <DashboardItem />
                <DashboardItem />
                <DashboardItem />
                <DashboardItem />
            </div>
        </div>
    )
}

export default DashBoard;