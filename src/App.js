import React, { Component } from 'react'
import { Notification } from 'react-notification'

import Wrapper from './components/Wrapper'
import Paper from './components/Paper'
import Header from './components/Header'
import Status from './components/Status'
import Button from './components/Button'

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
      balance: App.DEFAULT_BALANCE_AMOUNT
    },
    ui: {
      isActive: false,
      message: ''
    }
  }

  deposit = () => {
    this.setState(Api.deposit(App.DEFAULT_DEPOSIT_AMOUNT))
    this.setState(
      UI.notify({ type: 'deposit', amount: App.DEFAULT_DEPOSIT_AMOUNT })
    )
  }

  spend = () => {
    if (
      !hasMinimumBalance(this.state.data.balance, App.DEFAULT_EXPENSE_AMOUNT)
    ) {
      this.setState(UI.notify({ type: 'insufficient_balance', amount: 0 }))
      return
    }
    this.setState(Api.spend(App.DEFAULT_EXPENSE_AMOUNT))
    this.setState(
      UI.notify({ type: 'spend', amount: App.DEFAULT_EXPENSE_AMOUNT })
    )
  }

  closeNotification = () => {
    this.setState(UI.close())
  }

  render() {
    return (
      <Wrapper size="small">
        <Paper>
          <Header />
          <Status balance={this.state.data.balance} />
          <Button onClick={this.deposit} theme="green">
            Add Deposit
          </Button>
          <Button onClick={this.spend} theme="red">
            Add Expense
          </Button>
        </Paper>
        <StyledNotification
          isActive={this.state.ui.isActive}
          message={this.state.ui.message}
          action="Close"
          onClick={this.closeNotification}
        />
      </Wrapper>
    )
  }
}

export default App
