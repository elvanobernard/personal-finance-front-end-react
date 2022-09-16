import React from "react";

import Box from "./UI/Box";
import Button from "./UI/Button";
import CashTable from "./UI/CashTable";

import styles from "./Cash.module.css"
import { dummy_cash_account } from "../dummydata";

function Cash() {
    return (
        <div className={styles.container}>
            <div className={styles["box-container"]}>
                <Box title="Current Balance" amount={234567} />
                <Box title="Payable" amount={234567} />
                <Box title="Receivable" amount={234567} />
            </div>
            <div className={styles["sub-header"]}>
                <h2>Cash</h2>
                <div className={styles["button-container"]}>
                    <Button name="New Account" />
                    <Button name="New Transaction" />
                </div>
            </div>
            <CashTable rows={dummy_cash_account}/>
        </div>
    )
}

export default Cash;