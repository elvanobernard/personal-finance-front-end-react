import React from "react";

import styles from "./IncomeExpenseTable.module.css"

function IncomeExpenseTable(props) {
    const formatter = Intl.NumberFormat("id-ID", {'style': 'currency', 'currency': 'IDR'}) 

    return (
        <div className={styles.container}>
            <table className={styles["income-expense-table"]}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>No</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.rows.map(row => {
                            return (
                                <tr key={row.id}>
                                    <td>{row.date}</td>
                                    <td>{row.id}</td>
                                    <td>{row.description}</td>
                                    <td>{row.category}</td>
                                    <td>{formatter.format(row.amount)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default IncomeExpenseTable;