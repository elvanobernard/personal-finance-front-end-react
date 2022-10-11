import React, { useState } from "react";
import ReactDOM from 'react-dom/client'

import Box from "./UI/Box";
import Button from "./UI/Button";
import ReceivablePayableTable from "./UI/ReceivablePayableTable";
import ReceivablePayableForm from "./UI/ReceivablePayableTable"

import styles from "./ReceivablePayable.module.css"

import {dummy_expense_category, dummy_expense_entries, dummy_income_entries} from "../dummydata"
import Overlay from "./UI/Overlay.js";

function ReceivablePayable(props) {
    const dummy_entries_data = props.title === "Expense" ? dummy_expense_entries : dummy_income_entries

    const formOpen = useState(false)

    const overlay = formOpen ? <Overlay/> : "";
    const form = formOpen ? <ReceivablePayableForm /> : "";

    console.log(props.entries)

    return (
        <div className={styles.container}>
            {}

            
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
            <ReceivablePayableTable rows={"Test"}/>
        </div >
    )
}

export default ReceivablePayable;