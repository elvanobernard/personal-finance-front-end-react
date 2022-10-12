import React from "react";

import { Button, SmallButton } from "./Button";

import styles from "./ReceivablePayableTable.module.css"

function ReceivablePayableTable(props) {

    const formatter = Intl.NumberFormat("id-ID", {'style': 'currency', 'currency': 'IDR'}); 
    
    const onPaidButton = (e) => {
        console.log(e.target.parentNode.parentNode.dataset.id);
    }

    return (
        <div className={styles.container}>
            <table className={styles["receivable-payable-table"]}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Description</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.rows.map(row => {
                            return (
                                <tr key={row.id} data-id={row.id}>
                                    <td>{row.id}</td>
                                    <td>{row.date}</td>
                                    <td>{row.paid ? "Paid" : "Unpaid"}</td>
                                    <td>{row.description}</td>
                                    <td>{formatter.format(row.amount)}</td>
                                    <td>{row.paid ? "-" :<SmallButton name="pay" onClick={onPaidButton}/>}</td>
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