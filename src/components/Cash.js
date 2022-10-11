import React, { useEffect, useState } from "react";
import axios from "axios"

import Box from "./UI/Box";
import Button from "./UI/Button";
import CashTable from "./UI/CashTable";
import { AccountForm } from "./UI/Form";

import styles from "./Cash.module.css"
import { dummy_cash_account } from "../dummydata";

function Cash(props) {
    const getAccountForm = () => {
        props.onFormOpen(<AccountForm onClose={props.onFormClose}/>)
    }

    return (
        <div className={styles.container}>
            <div className={styles["box-container"]}>
                <Box title="Current Balance" amount={props.cashBalance} />
                <Box title="Payable" amount={props.payableBalance} />
                <Box title="Receivable" amount={props.receivableBalance} />
            </div>
            <div className={styles["sub-header"]}>
                <h2>Cash</h2>
                <div className={styles["button-container"]}>
                    <Button name="New Account" onClick={getAccountForm}/>
                    <Button name="New Transaction" />
                </div>
            </div>
            <CashTable rows={props.cashAccounts}/>
        </div>
    )
}

export default Cash;