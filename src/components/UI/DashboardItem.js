import React from "react";

import styles from "./DashboardItem.module.css"

function DashboardItem(props) {
    return (
        <div className={styles.container}>
            {props.children}
        </div>
    );
}

export default DashboardItem;