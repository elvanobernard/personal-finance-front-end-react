import React from "react";

import styles from "./Dashboard.module.css"
import Box from "./UI/Box";
import Button from "./UI/Button";
import DashboardItem from "./UI/DashboardItem";

import {dummy_balance_summary, dummy_monthly_expense, dummy_monthly_income, dummy_expense_entries, dummy_income_entries} from "../dummydata.js"

function DashBoard(props) {

    return (
        <div className={styles.container}>
            <div className={styles["box-container"]}>
                <Box title="Current Balance" amount={props.balance} />
                <Box title="Incomes" amount={props.incomeBalance}/>
                <Box title="Expenses" amount={props.expenseBalance}/>
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