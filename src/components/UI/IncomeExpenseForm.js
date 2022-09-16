import React from "react";
import Button from "./Button";

import styles from "./IncomeExpenseForm.module.css"

function IncomeExpenseForm(props) {
    return (
        <React.Fragment>
        <form className={styles["transaction-form"]}>
            <h2>New Expense/Income</h2>
            <label>Account</label>
            <select></select>
            <label>Category</label>
            <select></select>
            <label>Date</label>
            <input type="date"></input>
            <label>Description (Optional)</label>
            <input type="text"></input>
            <label>Amount</label>
            <input type="number"></input>
        </form>
        <Button className={styles.button} name="New Expense/Income"/>
        </React.Fragment>
    )
}

export default IncomeExpenseForm