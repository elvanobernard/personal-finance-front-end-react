import React from "react";

import { Button, SmallButton } from "./Button";

import styles from "./ReceivablePayableTable.module.css"

function ReceivablePayableTable(props) {

    return (
        <div className={styles.container}>
            <table className={styles["receivable-payable-table"]}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Status</th>
                        <th>Description</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {
                    props.rows.map(row => {
                        return (
                            <tr key={row.id}>
                                <td>{row.date.toLocaleDateString("id-ID")}</td>
                                <td>{row.transaction}</td>
                                <td>{row.description}</td>
                                <td>{row.category_name}</td>
                                <td>IDR {row.amount}</td>
                            </tr>
                        )
                    })
                } */}
                    {
                        props.rows.map(row => {
                            return (
                                <tr>
                                    <td>{row.id}</td>
                                    <td>{row.paid ? "Paid" : "Unpaid"}</td>
                                    <td>{row.description}</td>
                                    <td>{row.amount}</td>
                                    <td><SmallButton name="pay" /></td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}

export default ReceivablePayableTable