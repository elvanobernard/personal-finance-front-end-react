import React from "react";

import Box from "./UI/Box";
import Button from "./UI/Button";

import styles from "./IncomeExpense.module.css"
import Table from "./UI/Table";

function IncomeExpense() {
    return (
        <div className={styles.container}>
            <div className={styles["box-container"]}>
                <Box title="Summary" amount={234567} />
                <Box title="Summary" amount={234567} />
                <Box title="Summary" amount={234567} />
            </div>
            <div className={styles["sub-header"]}>
                <h2>Incomes/Expenses</h2>
                <div className={styles["button-container"]}>
                    <Button name="New Category" />
                    <Button name="Edit Category" />
                    <Button name="New Expense" />
                    <Button name="New Filter" />
                </div>
            </div>
            <Table />
        </div >
    )
}

export default IncomeExpense;