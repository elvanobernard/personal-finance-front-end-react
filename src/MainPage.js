import React from "react";
import NavigationPane from "./components/NavigationPane/NavigationPane.js"
import DashBoard from "./components/Dashboard.js"
import IncomeExpense from "./components/IncomeExpense.js";

import styles from "./MainPage.module.css"

function MainPage() {
    return (
        <div className={styles.container}>
            <NavigationPane />
            {/* <DashBoard /> */}
            <IncomeExpense />
        </div>
    )
}

export default MainPage