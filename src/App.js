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

class App extends Component {
  static DEFAULT_DEPOSIT_AMOUNT = 2000
  static DEFAULT_EXPENSE_AMOUNT = 500
  static DEFAULT_BALANCE_AMOUNT = 2300

  state = {
    data: {
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
      loading: true
    }
  }

  componentDidMount() {
    HTTP.getTransactions().then(({ data }) => {
      console.log(data)

      this.setState(prevState => {
        const newState = {
          ...prevState.data,
          transactions: [...data, prevState.data.transactions],
          loading: false
        }
        return { data: newState }
      })
    })
  }

  get balance() {
    return (
      (this.hasTransactions && this.transactions[0].balance) ||
      App.DEFAULT_BALANCE_AMOUNT
    )
  }

  get transactions() {
    return this.state.data.transactions
  }

  get hasTransactions() {
    return this.transactions.length > 0
  }

  addDeposit = () => {
    const { deposit, date, note } = this.state.form
    this.setState(
      Api.deposit({ amount: deposit, date, note, balance: this.balance })
    )
    this.setState(
      UI.notify({ type: 'deposit', amount: this.state.form.deposit })
    )
    this.resetForm()
  }

  resetForm = () => {
    this.setState({
      form: {
        ...this.state.form,
        note: '',
        date: moment(),
        deposit: App.DEFAULT_DEPOSIT_AMOUNT,
        spend: App.DEFAULT_EXPENSE_AMOUNT,
        isValid: false
      }
    })
  }

  createExpense = () => {
    const { spend, date, note } = this.state.form
    if (!hasMinimumBalance(this.balance, spend)) {
      this.setState(UI.notify({ type: 'insufficient_balance', amount: 0 }))
      return
    }
    this.setState(
      Api.spend({ amount: spend, date, note, balance: this.balance })
    )
    this.setState(UI.notify({ type: 'spend', amount: spend }))
    this.resetForm()
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
    const { isActive, message } = this.state.ui
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
        {this.loading || !this.transactions ? (
          <p>loading...</p>
        ) : (
          <Transactions
            transactions={this.transactions}
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
