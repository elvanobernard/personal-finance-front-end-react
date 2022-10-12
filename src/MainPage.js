import React, { useEffect, useState } from "react";
import NavigationPane from "./components/NavigationPane/NavigationPane.js"
import DashBoard from "./components/Dashboard.js"
import IncomeExpense from "./components/IncomeExpense.js";

import axios from "axios"
import { Route, Switch, Redirect } from "react-router-dom"

import { dummy_balance_summary } from "./dummydata.js"

import styles from "./MainPage.module.css"
import Cash from "./components/Cash.js";
import ReceivablePayable from "./components/ReceivablePayable.js";
import Overlay from "./components/UI/Overlay.js";

const getSum = (arr, property) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i][property]
    }

    return sum
}

const PAGE_ID = {
    DASHBOARD: 1,
    CASH: 2,
    EXPENSE: 3,
    INCOME: 4,
    PAYABLE: 5,
    RECEIVABLE: 6,
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

    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });

    const submitNewCashAccount = async (data) => {
        const endpoint = 'cash-accounts/';
        
        axios.post(`${host}${endpoint}`, data)
        .then(res => {
            const accounts = cashAccounts
            accounts.push(res.data);
            setCashAccounts(accounts)
            closeHandler()
        }).catch(err => {
            console.log(err)
        })
    }


    const submitNewCategory = async (data, identifier) => {
        const endpoint = identifier == PAGE_ID.EXPENSE ? 'expense-categories/' : 'income-categories/';
        axios.post(`${host}${endpoint}`, data)
            .then(res => {
                if (identifier == PAGE_ID.EXPENSE) {
                    const categories = expenseCategories;
                    categories.push(res.data);
                    setExpenseCategories(categories);
                } else if (identifier == PAGE_ID.INCOME) {
                    const categories = incomeCategories;
                    categories.push(res.data);
                    setIncomeCategories(categories);
                }
                closeHandler();
            }).catch((err) => {
                console.log(err);
            })
    }

    const submitNewTransaction = async (data, identifier) => {
        const endpoint = identifier == PAGE_ID.EXPENSE ? 'expenses/' : 'incomes/';
        axios.post(`${host}${endpoint}`, data)
            .then(res => {
                console.log(res.data)
                if (identifier == PAGE_ID.EXPENSE) {
                    const entries = expenses;
                    entries.push(res.data);
                    // setExpenseCategories(entries);
                } else if (identifier == PAGE_ID.INCOME) {
                    const entries = incomes;
                    entries.push(res.data);
                    // setIncomeCategories(entries);
                }
                closeHandler();
            }).catch(err => {
                console.log(err);
            })
    }

    const closeHandler = () => {
        setForm("")
    }

    const formOpenHandler = (form) => {
        setForm(form)
    }

    async function getData() {
        // Obtain initial data from back-end
        try {
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

    let expenseBalance = expenseSummary.length ? getSum(expenseSummary, 'balance') : 0;
    let incomeBalance = incomeSummary.length ? getSum(incomeSummary, 'balance') : 0;
    let expenseBudget = expenseSummary.length ? getSum(expenseCategories, 'budget') : 0;
    let incomeBudget = incomeSummary.length ? getSum(incomeCategories, 'budget') : 0;
    const incomeSaving = formatter.format(incomeBalance - incomeBudget);
    const expenseSaving = formatter.format(expenseBudget - expenseBalance);

    expenseBalance = formatter.format(expenseBalance);
    incomeBalance = formatter.format(incomeBalance);
    expenseBudget = formatter.format(expenseBudget);
    incomeBudget = formatter.format(incomeBudget);

    return (
        <div className={styles.container}>
            <NavigationPane onClick={closeHandler} />
            {form}
            {form ? <Overlay onClick={closeHandler} /> : ""}
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/dashboard" />
                </Route>
                <Route path="/expenses">
                    <IncomeExpense title="Expense"
                        identifier={PAGE_ID.EXPENSE}
                        onFormOpen={formOpenHandler}
                        onFormClose={closeHandler}
                        balance={expenseBalance}
                        summary={expenseSummary}
                        budget={expenseBudget}
                        saving={expenseSaving}
                        entries={expenses}
                        categories={expenseCategories}
                        cashAccounts={cashAccounts}
                        formatter={formatter}
                        onCategoryBtn={submitNewCategory}
                        onFormSubmitBtn={submitNewTransaction}
                    />
                </Route>
                <Route path="/incomes">
                    <IncomeExpense title="Income"
                        identifier={PAGE_ID.INCOME}
                        onFormOpen={formOpenHandler}
                        onFormClose={closeHandler}
                        balance={incomeBalance}
                        summary={incomeSummary}
                        budget={incomeBudget}
                        saving={incomeSaving}
                        entries={incomes}
                        categories={incomeCategories}
                        cashAccounts={cashAccounts}
                        formatter={formatter}
                        onCategoryBtn={submitNewCategory}
                    />
                </Route>
                <Route path="/dashboard">
                    <DashBoard balance={cashBalance}
                        identifier={PAGE_ID.DASHBOARD}
                        expenseBalance={expenseBalance}
                        incomeBalance={incomeBalance}
                        formatter={formatter}
                    />
                </Route>
                <Route path="/cash" >
                    <Cash onFormOpen={formOpenHandler} onFormClose={closeHandler}
                        identifier={PAGE_ID.CASH}
                        cashBalance={cashBalance}
                        payableBalance={payableBalance}
                        receivableBalance={receivableBalance}
                        cashAccounts={cashAccounts}
                        onNewAccBtn={submitNewCashAccount}
                    />
                </Route>
                <Route path="/payables">
                    <ReceivablePayable title="Payable"
                        identifier={PAGE_ID.PAYABLE}
                        balance={payableBalance}
                        entries={payables} />
                </Route>
                <Route path="/receivables">
                    <ReceivablePayable title="Receivable"
                        identifier={PAGE_ID.RECEIVABLE}
                        balance={receivableBalance}
                        entries={receivables} />
                </Route>
            </Switch>
        </div>
    )
}

export default MainPage