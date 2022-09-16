import React from "react";

import userImage from "../../static-image/user.png"
import styles from "./NavigationPane.module.css"

import {NavLink} from 'react-router-dom'

function NavigationPane() {
    return (
        <div className={styles["navigation-pane"]}>
            <div className={styles.container}>
                <img className={styles.user} src={userImage} />
                <h2 className={styles["user-welcome"]}>Hello User!</h2>
                <nav>
                    <ul className={styles["nav-links"]}>
                        <li><NavLink activeClassName={styles.active} to="dashboard">Dashboard</NavLink></li>
                        <li><NavLink activeClassName={styles.active} to="cash">Cash</NavLink></li>
                        <li><NavLink activeClassName={styles.active} to="expenses">Expenses</NavLink></li>
                        <li><NavLink activeClassName={styles.active} to="incomes">Incomes</NavLink></li>
                        <li><NavLink activeClassName={styles.active} to="receivables">Receivables</NavLink></li>
                        <li><NavLink activeClassName={styles.active} to="payables">Payables</NavLink></li>
                    </ul >
                </nav >
            </div>
        </div >
    )
}

export default NavigationPane;