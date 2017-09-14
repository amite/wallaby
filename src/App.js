import React, { Component } from 'react'
import { Notification } from 'react-notification'
import moment from 'moment'

import Wrapper from './components/Wrapper'
import Paper from './components/Paper'
import Header from './components/Header'
import Status from './components/Status'
import Form from './components/Form'

import Api, { hasMinimumBalance } from './api'
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
      balance: App.DEFAULT_BALANCE_AMOUNT,
      transactions: []
    },
    form: {
      note: '',
      deposit: App.DEFAULT_DEPOSIT_AMOUNT,
      spend: App.DEFAULT_EXPENSE_AMOUNT,
      date: moment()
    },
    ui: {
      isActive: false,
      message: ''
    }
  }

  addDeposit = () => {
    const { deposit, date, note } = this.state.form
    this.setState(Api.deposit({ amount: deposit, date, note }))
    this.setState(
      UI.notify({ type: 'deposit', amount: this.state.form.deposit })
    )
  }

  createExpense = () => {
    const { spend } = this.state.form
    if (!hasMinimumBalance(this.state.data.balance, spend)) {
      this.setState(UI.notify({ type: 'insufficient_balance', amount: 0 }))
      return
    }
    this.setState(Api.spend(spend))
    this.setState(UI.notify({ type: 'spend', amount: spend }))
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

  closeNotification = () => {
    this.setState(UI.close())
  }

  render() {
    const { balance } = this.state.data
    const { isActive, message } = this.state.ui
    return (
      <Wrapper size="small">
        <Paper>
          <Header />
          <Status balance={balance} />
          <Form
            {...this.state.form}
            addDeposit={this.addDeposit}
            createExpense={this.createExpense}
            handleChange={this.handleChange}
            onDateChange={this.onDateChange}
            onFocusChange={this.onFocusChange}
          />
        </Paper>
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
