import React from "react";

import Box from "./UI/Box";
import Button from "./UI/Button";

import styles from "./IncomeExpense.module.css"
import IncomeExpenseTable from "./UI/IncomeExpenseTable";

import {dummy_expense_category, dummy_expense_entries, dummy_income_entries} from "../dummydata"

function IncomeExpense(props) {
    const dummy_entries_data = props.title === "Expense" ? dummy_expense_entries : dummy_income_entries

    

    return (
        <div className={styles.container}>
            <div className={styles["box-container"]}>
                {/* TODO Implement the function to display summary */}
                <Box title="Spending" amount={234567} /> 
                <Box title="Budget" amount={234567} />
                <Box title="Saving" amount={234567} />
            </div>
            <div className={styles["sub-header"]}>
                <h2>{props.title + "s"}</h2>
                <div className={styles["button-container"]}>
                    <Button name="New Category" />
                    <Button name="Edit Category" />
                    <Button name={"New " + props.title} />
                    <Button name="New Filter" />
                </div>
            </div>
            <IncomeExpenseTable rows={dummy_entries_data}/>
        </div >
    )
}

export default IncomeExpense;