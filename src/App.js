import React, { Component } from 'react'

import glamorous from 'glamorous'

import Paper from './components/Paper'
import Header from './components/Header'
import Status from './components/Status'
import Button from './components/Button'

import Api, { hasMinimumBalance } from './api'

const Wrapper = glamorous.div(
  ({ size }) => ({ width: size === 'small' ? '80%' : '90%' }),
  {
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '100%',
    '@media(min-width: 40em)': {
      width: '40%'
    }
  }
)

class App extends Component {
  static DEFAULT_DEPOSIT_AMOUNT = 2000
  static DEFAULT_EXPENSE_AMOUNT = 500
  static DEFAULT_BALANCE_AMOUNT = 2000

  state = {
    balance: App.DEFAULT_BALANCE_AMOUNT
  }

  deposit = () => {
    this.setState(Api.deposit(App.DEFAULT_DEPOSIT_AMOUNT))
  }

  spend = () => {
    if (!hasMinimumBalance(this.state.balance, App.DEFAULT_EXPENSE_AMOUNT)) {
      console.log('you have insufficient balance')
    }
    this.setState(Api.spend(App.DEFAULT_EXPENSE_AMOUNT))
  }

  render() {
    return (
      <Wrapper size="small">
        <Paper>
          <Header />
          <Status balance={this.state.balance} />
          <Button onClick={this.deposit} theme="green">
            Add Deposit
          </Button>
          <Button onClick={this.spend} theme="red">
            Add Expense
          </Button>
        </Paper>
      </Wrapper>
    )
  }
}

export default App
