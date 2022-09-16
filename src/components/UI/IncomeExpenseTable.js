import React from "react";

import styles from "./IncomeExpenseTable.module.css"

function IncomeExpenseTable(props) {
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
                                    <td>{row.date.toLocaleDateString("id-ID")}</td>
                                    <td>{row.transaction}</td>
                                    <td>{row.description}</td>
                                    <td>{row.category_name}</td>
                                    <td>IDR {row.amount}</td>
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