import React from "react";

import styles from "./CashTable.module.css"

function CashTable(props) {

    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });

    return (
        <div className={styles.container}>
            <table>
                <thead>
                    <tr>
                        <th>Account</th>
                        <th>Description</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.rows.map(row => {
                            return (
                                <tr key={row.id}>
                                    <td>{row.name}</td>
                                    <td>{row.description}</td>
                                    <td>{formatter.format(row.balance)}</td>
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