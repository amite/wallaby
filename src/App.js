import React, { Component } from 'react'
import { Notification } from 'react-notification'
import moment from 'moment'

import Wrapper from './components/Wrapper'
import Paper from './components/Paper'
import Header from './components/Header'
import Status from './components/Status'
import Form from './components/Form'
import Transactions from './components/Transactions'

import Api, { hasMinimumBalance } from './api'
import HTTP from './api/http'
import UI from './ui'

import glamorous from 'glamorous'

const StyledNotification = glamorous(Notification)({
  backgroundColor: 'rgba(47, 196, 93, 0.94) !important'
})

export const DEPOSIT = 'Deposit'
export const EXPENSE = 'Expense'

class App extends Component {
  static DEFAULT_DEPOSIT_AMOUNT = 2000
  static DEFAULT_EXPENSE_AMOUNT = 500
  static DEFAULT_BALANCE_AMOUNT = 2300

  initialState = {
    data: {
      currentBalance: null,
      transactions: []
    },
    form: {
      note: '',
      deposit: App.DEFAULT_DEPOSIT_AMOUNT,
      spend: App.DEFAULT_EXPENSE_AMOUNT,
      date: moment(),
      isValid: false
    },
    ui: {
      isActive: false,
      message: '',
      isLoading: false
    }
  }

  state = {
    ...this.initialState
  }

  async componentDidMount() {
    this.setState(UI.startLoading())
    try {
      const { data } = await HTTP.loadTransactions()
      let currentBalance = Api.latestTransactionBalance(
        data,
        App.DEFAULT_BALANCE_AMOUNT
      )

      this.setState(Api.getTransactionsAndBalance(data, { currentBalance }))
    } catch (error) {
      // fire notification - data not loaded
      // setState - set a flag to show try again ui
    }
    this.setState(UI.stopLoading())
  }

  get balance() {
    return this.state.data.currentBalance
  }

  get transactionsSortedByOldestDate() {
    return this.transactions.sort(function(left, right) {
      return moment.utc(left.date).diff(moment.utc(right.date))
    })
  }

  get transactionsSortedByLatestDate() {
    return this.transactions.sort(function(left, right) {
      return moment.utc(right.date).diff(moment.utc(left.date))
    })
  }

  get transactions() {
    return this.state.data.transactions
  }

  get hasTransactions() {
    return this.transactions.length > 0
  }

  buildNewTransaction = ({ amount, type }) => {
    const { date, note } = this.state.form
    return {
      amount: parseInt(amount, 10),
      date,
      type,
      note,
      balance: Api.calculateNewBalance({
        oldBalance: this.balance,
        amount: parseInt(amount, 10),
        type
      })
    }
  }

  addDeposit = async () => {
    const { deposit } = this.state.form

    const newTransaction = this.buildNewTransaction({
      amount: deposit,
      type: DEPOSIT
    })

    this.setState(Api.addTransaction(newTransaction))
    this.setState(UI.startLoading())
    try {
      await HTTP.saveTransaction(newTransaction)
    } catch (error) {
      // fire notification
    }
    this.setState(UI.stopLoading())

    this.setState(UI.notify({ type: DEPOSIT, amount: this.state.form.deposit }))
    this.resetForm()
  }

  createExpense = async () => {
    const { spend } = this.state.form
    if (!hasMinimumBalance(this.balance, spend)) {
      this.setState(UI.notify({ type: 'insufficient_balance', amount: 0 }))
      return
    }

    const newTransaction = this.buildNewTransaction({
      amount: spend,
      type: EXPENSE
    })

    this.setState(Api.addTransaction(newTransaction))
    this.setState(UI.startLoading())
    try {
      await HTTP.saveTransaction(newTransaction)
    } catch (error) {
      // fire notification
    }
    this.setState(UI.stopLoading())

    this.setState(UI.notify({ type: EXPENSE, amount: spend }))
    this.resetForm()
  }

  resetForm = () => {
    this.setState({
      form: {
        ...this.state.form,
        ...this.initialState.form
      }
    })
  }

  handleChange = evt => {
    evt.preventDefault()
    this.setState({
      form: { ...this.state.form, [evt.target.name]: evt.target.value }
    })
  }

  onDateChange = date => {
    this.setState({
      form: { ...this.state.form, date: date }
    })
  }

  onNoteChange = evt => {
    this.setState({
      form: {
        ...this.state.form,
        note: evt.target.value,
        isValid: evt.target.value !== '' ? true : false
      }
    })
  }

  closeNotification = () => {
    this.setState(UI.close())
  }

  render() {
    const { isActive, message, isLoading } = this.state.ui
    return (
      <Wrapper size="small">
        <Paper>
          <Header />
          <Status balance={this.balance} />
          <Form
            {...this.state.form}
            addDeposit={this.addDeposit}
            createExpense={this.createExpense}
            handleChange={this.handleChange}
            onDateChange={this.onDateChange}
            onNoteChange={this.onNoteChange}
          />
        </Paper>
        {isLoading || !this.hasTransactions ? (
          <p>loading...</p>
        ) : (
          <Transactions
            transactions={this.transactionsSortedByLatestDate}
            transactionsCount={this.transactions.length}
          />
        )}
        <StyledNotification
          isActive={isActive}
          message={message}
          action="Close"
          onClick={this.closeNotification}
        />
      </Wrapper>
    )
  }
}

export default App
