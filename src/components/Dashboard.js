import React from "react";

import styles from "./Dashboard.module.css"
import Box from "./UI/Box";
import Button from "./UI/Button";
import DashboardItem from "./UI/DashboardItem";

import {dummy_balance_summary, dummy_monthly_expense, dummy_monthly_income, dummy_expense_entries, dummy_income_entries} from "../dummydata.js"

function DashBoard(props) {

    const sum_balance = (array) => {
        let sum = 0
        array.forEach(element => {
            sum += element.balance
        });

        return sum
    }

    return (
        <div className={styles.container}>
            <div className={styles["box-container"]}>
                <Box title="Current Balance" amount={dummy_balance_summary[0].cash_balance} />
                <Box title="Incomes" amount={sum_balance(dummy_monthly_income)}/>
                <Box title="Expenses" amount={sum_balance(dummy_monthly_expense)}/>
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