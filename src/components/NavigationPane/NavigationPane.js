import React from "react";

import userImage from "../../static-image/user.png"
import styles from "./NavigationPane.module.css"

function NavigationPane() {
    return (
        <div className={styles["navigation-pane"]}>
            <div className={styles.container}>
                <img className={styles.user} src={userImage} />
                <h2 className={styles["user-welcome"]}>Hello User!</h2>
                <nav>
                    <ul className={styles["nav-links"]}>
                        <li><a className={styles["nav-link"]} href="#">Dashboard</a></li>
                        <li><a className={styles["nav-link"]} href="#">Cash</a></li>
                        <li><a className={styles["nav-link"]} href="#">Expenses</a></li>
                        <li><a className={styles["nav-link"]} href="#">Incomes</a></li>
                        <li><a className={styles["nav-link"]} href="#">Receivables</a></li>
                        <li><a className={styles["nav-link"]} href="#">Payables</a></li>
                    </ul >
                </nav >
            </div>
        </div >
    )
}

export default NavigationPane;