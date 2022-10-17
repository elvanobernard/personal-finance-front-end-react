import React, { useState, useEffect } from "react";
import axios from "axios"

import Box from "./UI/Box";
import { Button } from "./UI/Button";
import { ReceivablePayableTable } from "./UI/Table";
import { CreatePaymentForm } from "./UI/Form"
import { Pagination } from "./UI/Pagination";
import {host, PAGE_ID} from "../constant.js"

import styles from "./ReceivablePayable.module.css"

function ReceivablePayable(props) {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [entries, setEntries] = useState({count: 0, results: []});
    const offset = (currentPage - 1) * pageSize;
    let pageCount = Math.floor(entries.count / pageSize) + 1;

    const getPaymentForm = (id) => {
        props.onModalOpen(
            <CreatePaymentForm
                id={id}
                cashAccounts={props.cashAccounts}
                onClose={props.onFormClose}
                onSubmit={makePayment}
                identifier={props.identifier}
            />
        )
    }

    const makePayment = async (data, identifier) => {
        const endpoint = identifier === PAGE_ID.PAYABLE ? 'payables/' : 'receivables/'
        const payable = await axios.get(`${host}${endpoint}${data.id}/`);
        const payableData = payable.data
        payableData.paid = true;
        payableData.payment_date = data.date;
        payableData.cash_account = data.account;
        console.log(payableData);
        axios.put(`${host}${endpoint}${data.id}/`, payableData)
            .then(res => {
                console.log(res);
                props.onFormClose()
            }).catch(err => {
                console.log(err);
            })
    };

    
    const pageChangeHandler = (page) => {
        setCurrentPage(page);
    }

    const getEntriesData = async () => {
        const endpoint = props.identifier === PAGE_ID.PAYABLE ? "payables" : "receivables";
        const entriesData = await axios.get(`${host}${endpoint}/?limit=${pageSize}&offset=${offset}`);
        setEntries(entriesData.data);
    }
    
    useEffect(() => {setCurrentPage(1)}, [props.identifier]);
    useEffect(() => {getEntriesData()}, [props.identifier, currentPage, pageSize]);

    return (
        <div className={styles.container}>
            { }


            <div className={styles["box-container"]}>
                {/* TODO Implement the function to display summary */}
                <Box title={props.title} amount={props.balance} />
            </div>
            <div className={styles["sub-header"]}>
                <h2>{props.title + "s"}</h2>
                <div className={styles["button-container"]}>
                    <Button name="Add" />
                    <Button name="Sort" />
                    <Button name="Filter" />
                </div>
            </div>
            <Pagination currentPage={currentPage} pageCount={pageCount} onPageBtn={pageChangeHandler}/>
            <ReceivablePayableTable rows={entries.results} onPayBtn={getPaymentForm} identifier={props.identifier} />
            <Pagination currentPage={currentPage} pageCount={pageCount} onPageBtn={pageChangeHandler}/>
        </div >
    )
}

export default ReceivablePayable;