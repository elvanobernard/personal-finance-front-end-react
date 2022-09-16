import React from "react";

import Button from "./Button";

import styles from "./ReceivablePayableTable.module.css"

function ReceivablePayableTable(){

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
                <tr>
                    <td>10123</td>
                    <td>Unpaid</td>
                    <td>Token Listrik</td>
                    <td>IDR 20,000</td>
                    <td><Button name="pay"/></td>
                </tr>
                <tr>
                    <td>10123</td>
                    <td>Unpaid</td>
                    <td>Token Listrik</td>
                    <td>IDR 20,000</td>
                    <td><Button name="pay"/></td>
                </tr>
            </tbody>
        </table>
    </div>
    )
}

export default ReceivablePayableTable