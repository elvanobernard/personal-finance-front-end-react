import React from "react";

import styles from "./Box.module.css"

function Box(props) {
    return (
        <div className={styles.container}>
            <div className={styles["box-header"]}><span>{props.title}</span></div>
            <span className={styles["box-content"]}>{props.amount}</span>
        </div>
    )
}

export default Box;