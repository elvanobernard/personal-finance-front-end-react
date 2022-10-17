import React, { useState } from "react";
import ReactDOM from "react-dom"


import styles from "./IncomeExpense.module.css"

import { dummy_expense_category, dummy_expense_entries, dummy_income_entries } from "../dummydata"

import Box from "./UI/Box";
import { Pagination, PageSize } from "./UI/Pagination"
import { Button } from "./UI/Button";
import { CategoryTable, IncomeExpenseTable } from "./UI/Table";
import Overlay from "./UI/Overlay";
import { IncomeExpenseForm, CategoryForm } from "./UI/Form";

function IncomeExpense(props) {
    // const dummy_entries_data = props.title === "Expense" ? dummy_expense_entries : dummy_income_entries

    const getCategoryForm = () => {
        props.onModalOpen(
            <CategoryForm
                onClose={props.onFormClose}
                onSubmit={props.onCategoryBtn}
                identifier={props.identifier}
            />);
    }

    const getIncomeExpenseForm = () => {
        props.onModalOpen(
            <IncomeExpenseForm
                onClose={props.onFormClose}
                onSubmit={props.onFormSubmitBtn}
                title={props.title}
                cashAccounts={props.cashAccounts}
                categories={props.categories}
                identifier={props.identifier}
            />);
    }

    const getCategoryTableModal = () => {
        props.onModalOpen(
            <CategoryTable rows={props.categories} />
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles["box-container"]}>
                <Box title="Spending" amount={props.balance} />
                <Box title="Budget" amount={props.budget} />
                <Box title="Saving" amount={props.saving} />
            </div>
            <div className={styles["sub-header"]}>
                <h2>{props.title + "s"}</h2>
                <div className={styles["button-container"]}>
                    <Button name="New Category" onClick={getCategoryForm} />
                    <Button name="Show Category" onClick={getCategoryTableModal} />
                    <Button name={"New " + props.title} onClick={getIncomeExpenseForm} />
                    <Button name="New Filter" />
                </div>
            </div>
            <Pagination />
            <PageSize />
            <IncomeExpenseTable rows={props.entries} />
        </div >
    )
}

export default IncomeExpense;