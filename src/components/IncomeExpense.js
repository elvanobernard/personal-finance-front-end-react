import React, { useState } from "react";
import ReactDOM from "react-dom"


import styles from "./IncomeExpense.module.css"

import {dummy_expense_category, dummy_expense_entries, dummy_income_entries} from "../dummydata"

import Box from "./UI/Box";
import Button from "./UI/Button";
import IncomeExpenseTable from "./UI/IncomeExpenseTable";
import Overlay from "./UI/Overlay";
import {IncomeExpenseForm, CategoryForm} from "./UI/Form";

function IncomeExpense(props) {
    // const dummy_entries_data = props.title === "Expense" ? dummy_expense_entries : dummy_income_entries

    const getCategoryForm = () => {
        props.onFormOpen(<CategoryForm onClose={props.onFormClose}/>);
    }

    const getIncomeExpenseForm = () => {
        props.onFormOpen(<IncomeExpenseForm onClose={props.onFormClose}/>);
    }

    return (
        <div className={styles.container}>
            <div className={styles["box-container"]}>
                <Box title="Spending" amount={props.balance} /> 
                <Box title="Budget" amount={props.budget} />
                <Box title="Saving" amount={props.budget - props.balance} />
            </div>
            <div className={styles["sub-header"]}>
                <h2>{props.title + "s"}</h2>
                <div className={styles["button-container"]}>
                    <Button name="New Category" onClick={getCategoryForm}/>
                    <Button name="Show Category" />
                    <Button name={"New " + props.title} onClick={getIncomeExpenseForm}/>
                    <Button name="New Filter" />
                </div>
            </div>
            <IncomeExpenseTable rows={props.entries}/>
        </div >
    )
}

export default IncomeExpense;