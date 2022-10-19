import React, { useEffect, useState } from "react";
import axios from "axios"


import styles from "./IncomeExpense.module.css"
import {host, PAGE_ID} from "../constant.js"

import Box from "./UI/Box";
import { Pagination, PageSize } from "./UI/Pagination"
import { Button } from "./UI/Button";
import { CategoryTable, IncomeExpenseTable } from "./UI/Table";
import { IncomeExpenseForm, CategoryForm, FilterForm } from "./UI/Form";

function IncomeExpense(props) {
    // const dummy_entries_data = props.title === "Expense" ? dummy_expense_entries : dummy_income_entries
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [entries, setEntries] = useState({count: 0, results: []});
    const offset = (currentPage - 1) * pageSize;
    let pageCount =  Math.ceil(entries.count / pageSize);

    const getCategoryForm = (data={id:"", name: "", budget: ""}) => {
        props.onModalOpen(
            <CategoryForm
                onClose={props.onFormClose}
                onSubmit={props.onNewCategory}
                onUpdate={props.onUpdateCategory}
                identifier={props.identifier}
                data={data}
            />);
    }

    const getIncomeExpenseForm = () => {
        props.onModalOpen(
            <IncomeExpenseForm
                onClose={props.onFormClose}
                onSubmit={submitNewTransaction}
                title={props.title}
                cashAccounts={props.cashAccounts}
                categories={props.categories}
                identifier={props.identifier}
            />);
    }

    const getCategoryTableModal = () => {

        const editBtnHandler = (data) => {
            getCategoryForm(data)
        }

        props.onModalOpen(
            <CategoryTable rows={props.categories} onEditBtn={editBtnHandler}/>
        )
    }

    const getFilterModal = () => {
        props.onModalOpen(
            <FilterForm onClose={props.onFormClose}/>
        )
    }
    
    const submitNewTransaction = async (data, identifier) => {
        const endpoint = identifier === PAGE_ID.EXPENSE ? 'expenses/' : 'incomes/';
        axios.post(`${host}${endpoint}`, data)
            .then(res => {
                console.log(res.data)
                getEntriesData();
                props.onUpdate(identifier);
                props.onFormClose();
            }).catch(err => {
                console.log(err);
            })
    };

    const pageChangeHandler = (page) => {
        setCurrentPage(page);
    }

    const getEntriesData = async () => {
        const endpoint = props.identifier === PAGE_ID.EXPENSE ? "expenses" : "incomes";
        const entriesData = await axios.get(`${host}${endpoint}/?limit=${pageSize}&offset=${offset}`);
        setEntries(entriesData.data);
    }

    useEffect(() => {setCurrentPage(1)}, [props.identifier]);
    useEffect(() => {getEntriesData()}, [props.identifier, currentPage, pageSize]);

    return (
        <div className={styles.container}>
            <div className={styles["box-container"]}>
                <Box title={props.identifier === PAGE_ID.EXPENSE ? "Spending" : "Income"} amount={props.balance} />
                <Box title={props.identifier === PAGE_ID.EXPENSE ? "Budget" : "Target"} amount={props.budget} />
                <Box title={props.identifier === PAGE_ID.EXPENSE ? "Saving" : "Excess"} amount={props.saving} />
            </div>
            <div className={styles["sub-header"]}>
                <h2>{props.title + "s"}</h2>
                <div className={styles["button-container"]}>
                    <Button name="New Category" onClick={getCategoryForm} />
                    <Button name="Show Category" onClick={getCategoryTableModal} />
                    <Button name={"New " + props.title} onClick={getIncomeExpenseForm} />
                    <Button name="New Filter" onClick={getFilterModal}/>
                </div>
            </div>
            <Pagination currentPage={currentPage} pageCount={pageCount} onPageBtn={pageChangeHandler}/>
            <IncomeExpenseTable rows={entries.results} />
            <Pagination currentPage={currentPage} pageCount={pageCount} onPageBtn={pageChangeHandler}/>
            {/* <PageSize /> */}
        </div >
    )
}

export default IncomeExpense;