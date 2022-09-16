import React from "react";

import Box from "./UI/Box";
import Button from "./UI/Button";
import ReceivablePayableTable from "./UI/ReceivablePayableTable";

import styles from "./ReceivablePayable.module.css"

import {dummy_expense_category, dummy_expense_entries, dummy_income_entries} from "../dummydata"

function ReceivablePayable(props) {
    const dummy_entries_data = props.title === "Expense" ? dummy_expense_entries : dummy_income_entries

    

    return (
        <div className={styles.container}>
            <div className={styles["box-container"]}>
                {/* TODO Implement the function to display summary */}
                <Box title="Payable" amount={234567} /> 
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