import React from "react";
import Button from "./Button";
import Card from "./Card"

import styles from "./Form.module.css"

export function IncomeExpenseForm(props) {
    return (
        <Card className={styles.form}>
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
        <div className={styles["button-container"]}>
            <Button className={styles.button} name="New Expense/Income"/>
            <Button className={styles.button} name="Cancel" onClick={props.onClose}/>
        </div>
        </Card>
    )
}

export function AccountForm(props) {
    return (
        <Card className={styles.form}>
        <form className={styles["transaction-form"]}>
            <h2>New Account</h2>
            <label>Name</label>
            <input type="text"></input>
            <label>Description</label>
            <input type="text"></input>
            <label>Initial Balance</label>
            <input type="number"></input>
        </form>
        
        <div className={styles["button-container"]}>
            <Button className={styles.button} name="New Account"/>
            <Button className={styles.button} name="Cancel" onClick={props.onClose}/>
        </div>
        </Card>
    )
}

export function CategoryForm(props) {
    return (
        <Card className={styles.form}>
        <form className={styles["transaction-form"]}>
            <h2>New Category</h2>
            <label>Name</label>
            <input type="text"></input>
            <label>Category</label>
            <input type="text"></input>
            <label>Description</label>
            <input type="text"></input>
        </form>
        
        <div className={styles["button-container"]}>
            <Button className={styles.button} name="New Category"/>
            <Button className={styles.button} name="Cancel" onClick={props.onClose}/>
        </div>
        </Card>
    )
}
