import React from "react";

import styles from "./Table.module.css"

function Table() {
    return (
        <div className={styles.container}>
            <table>
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
                    <tr>
                        <td>27-08-2022</td>
                        <td>10123</td>
                        <td>Token Listrik</td>
                        <td>Home</td>
                        <td>IDR 20.000</td>
                    </tr>
                    <tr>
                        <td>27-08-2022</td>
                        <td>10124</td>
                        <td>Beras</td>
                        <td>Grocery</td>
                        <td>IDR 50.000</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Table;