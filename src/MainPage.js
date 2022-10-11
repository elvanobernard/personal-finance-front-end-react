import React, { useEffect, useState } from "react";
import NavigationPane from "./components/NavigationPane/NavigationPane.js"
import DashBoard from "./components/Dashboard.js"
import IncomeExpense from "./components/IncomeExpense.js";

import axios from "axios"
import {Route, Switch, Redirect} from "react-router-dom"

import {dummy_balance_summary} from "./dummydata.js"

import styles from "./MainPage.module.css"
import Cash from "./components/Cash.js";
import ReceivablePayable from "./components/ReceivablePayable.js";
import Overlay from "./components/UI/Overlay.js";

const getSum = (arr, property) => {
    let sum = 0;
    for(let i = 0; i < arr.length; i++){
        sum += arr[i][property]
    }

    return sum
}

function MainPage() {

    const host = 'http://127.0.0.1:8000/'

    const [form, setForm] = useState("");
    const [balance, setBalance] = useState({
        "cash_balance": 0,
        "receivable_balance": 0,
        "payable_balance": 0
    });
    const [incomeSummary, setIncomeSummary] = useState([]);
    const [expenseSummary, setExpenseSummary] = useState([]);
    const [cashAccounts, setCashAccounts] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [expenseCategories, setExpenseCategories] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [incomeCategories, setIncomeCategories] = useState([]);
    const [payables, setPayables] = useState([]);
    const [receivables, setReceivables] = useState([]);

    const closeHandler = () => {
        setForm("")
    }

    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });

    const formOpenHandler = (form) => {
        setForm(form)
    }

    async function getData(){
        // Obtain initial data from back-end
        try{
            const cashBalance = axios.get(`${host}balance-summary/`);
            const time = new Date();
            const year = time.getFullYear();
            const month = time.getMonth() + 1;
            const expenseSummary = axios.get(`${host}monthly-expense-summary/${year}/${month}`);
            const incomeSummary = axios.get(`${host}monthly-income-summary/${year}/${month}`);
            const accounts = axios.get(`${host}cash-accounts/`)
            const expenses = axios.get(`${host}expenses/`)
            const expenseCategories = axios.get(`${host}expense-categories/`)
            const incomes = axios.get(`${host}incomes/`)
            const incomeCategories = axios.get(`${host}income-categories/`)
            const payables = axios.get(`${host}payables/`)
            const receivables = axios.get(`${host}receivables/`)
            
            Promise.allSettled([cashBalance, expenseSummary, incomeSummary, accounts, expenses, expenseCategories, incomes, incomeCategories, payables, receivables]).then((results) => {
                setBalance(results[0].value.data[0])
                setExpenseSummary(results[1].value.data);
                setIncomeSummary(results[2].value.data);
                setCashAccounts(results[3].value.data)
                setExpenses(results[4].value.data)
                setExpenseCategories(results[5].value.data)
                setIncomes(results[6].value.data)
                setIncomeCategories(results[7].value.data)
                setPayables(results[8].value.data)
                setReceivables(results[9].value.data)
            });
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        getData();
    }, [])


    const cashBalance = formatter.format(balance.cash_balance)
    const payableBalance = formatter.format(balance.payable_balance)
    const receivableBalance = formatter.format(balance.receivable_balance)

    const expenseBalance = formatter.format(expenseSummary.length ? getSum(expenseSummary, 'balance') : 0);
    const incomeBalance = formatter.format(incomeSummary.length ? getSum(incomeSummary, 'balance') : 0);
    const expenseBudget = formatter.format(expenseSummary.length ? getSum(expenseCategories, 'budget') : 0);
    const incomeBudget = formatter.format(incomeSummary.length ? getSum(incomeCategories, 'target') : 0);
    return (
        <div className={styles.container}>
            <NavigationPane />
            {form}
            {form ? <Overlay onClick={closeHandler}/> : ""}
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/dashboard"/>
                </Route>
                <Route path="/expenses">
                    <IncomeExpense title="Expense" 
                    onFormOpen={formOpenHandler} 
                    onFormClose={closeHandler} 
                    balance={expenseBalance} 
                    summary={expenseSummary}
                    budget={expenseBudget}
                    entries={expenses}
                    categories={expenseCategories}
                    formatter={formatter}/>
                </Route>
                <Route path="/incomes">
                    <IncomeExpense title="Income" 
                    onFormOpen={formOpenHandler} 
                    onFormClose={closeHandler} 
                    balance={incomeBalance} 
                    summary={incomeSummary} 
                    budget={incomeBudget}
                    entries={incomes}
                    categories={incomeCategories}
                    formatter={formatter}/>
                </Route>
                <Route path="/dashboard">
                    <DashBoard balance={cashBalance} 
                    expenseBalance={expenseBalance} 
                    incomeBalance={incomeBalance} 
                    formatter={formatter}/>
                </Route>
                <Route path="/cash" >
                    <Cash onFormOpen={formOpenHandler} onFormClose={closeHandler} 
                    cashBalance={cashBalance}
                    payableBalance={payableBalance}
                    receivableBalance={receivableBalance}
                    cashAccounts={cashAccounts}
                    />
                </Route>
                <Route path="/payables">
                    <ReceivablePayable title="Payable" 
                    balance={payableBalance}
                    entries={payables}/>
                </Route>
                <Route path="/receivables">
                    <ReceivablePayable title="Receivable"
                    balance={receivableBalance}
                    entries={receivables}/>
                </Route>
            </Switch>
        </div>
    )
}

export default MainPage