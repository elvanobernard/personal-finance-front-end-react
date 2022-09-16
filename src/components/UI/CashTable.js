import React from "react";

import styles from "./CashTable.module.css"

function CashTable(props) {
    return (
        <div className={styles.container}>
            <table>
                <thead>
                    <tr>
                        <th>Account</th>
                        <th>Description</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.rows.map(row => {
                            return (
                                <tr key={row.id}>
                                    <td>{row.name}</td>
                                    <td>{row.description}</td>
                                    <td>{row.total}</td>
                                </tr>
                            )
                        })
                    }
                    {/* <tr>
                        <td>27-08-2022</td>
                        <td>10123</td>
                        <td>Token Listrik</td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    )
}

export default CashTable;