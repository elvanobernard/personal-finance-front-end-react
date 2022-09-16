import React from "react";
import NavigationPane from "./components/NavigationPane/NavigationPane.js"
import DashBoard from "./components/Dashboard.js"
import IncomeExpense from "./components/IncomeExpense.js";
import IncomeExpenseForm from "./components/UI/IncomeExpenseForm"
import CategoryForm from "./components/UI/CategoryForm"
import Card from "./components/UI/Card.js";

import axios from "axios"
import {Route, Switch, Redirect} from "react-router-dom"

import {dummy_balance_summary} from "./dummydata.js"

import styles from "./MainPage.module.css"
import Cash from "./components/Cash.js";
import ReceivablePayable from "./components/ReceivablePayable.js";

function MainPage() {
    
    return (
        <div className={styles.container}>
            <NavigationPane />
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/dashboard"/>
                </Route>
                <Route path="/expenses">
                    <IncomeExpense title="Expense"/>
                </Route>
                <Route path="/incomes">
                    <IncomeExpense title="Income"/>
                </Route>
                <Route path="/dashboard">
                    <DashBoard />
                </Route>
                <Route path="/cash">
                    <Cash />
                </Route>
                <Route path="/payables">
                    <ReceivablePayable title="Payable" />
                </Route>
                <Route path="/receivables">
                    <ReceivablePayable title="Receivable"/>
                </Route>
            </Switch>
        </div>
    )
}

export default MainPage