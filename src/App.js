import React, { Component } from 'react'
import { Notification } from 'react-notification'

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
      note: '',
      deposit: App.DEFAULT_DEPOSIT_AMOUNT,
      spend: App.DEFAULT_EXPENSE_AMOUNT
    },
    ui: {
      isActive: false,
      message: ''
    }
  }

  deposit = () => {
    this.setState(Api.deposit(this.state.data.deposit))
    this.setState(
      UI.notify({ type: 'deposit', amount: this.state.data.deposit })
    )
  }

  handleChange = evt => {
    evt.preventDefault()
    this.setState({
      data: { ...this.state.data, [evt.target.name]: evt.target.value }
    })
  }

  spend = () => {
    const { balance, spend } = this.state.data
    if (!hasMinimumBalance(balance, spend)) {
      this.setState(UI.notify({ type: 'insufficient_balance', amount: 0 }))
      return
    }
    this.setState(Api.spend(spend))
    this.setState(UI.notify({ type: 'spend', amount: spend }))
  }

  closeNotification = () => {
    this.setState(UI.close())
  }

  render() {
    const { balance, note, deposit, spend } = this.state.data
    const { isActive, message } = this.state.ui
    return (
      <Wrapper size="small">
        <Paper>
          <Header />
          <Status balance={balance} />
          <Form
            note={note}
            deposit={this.deposit}
            spend={this.spend}
            depositAmt={deposit}
            spendAmt={spend}
            handleChange={this.handleChange}
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
