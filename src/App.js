import React, { Component } from 'react'

import glamorous from 'glamorous'

import Paper from './components/Paper'
import Header from './components/Header'
import Status from './components/Status'
import Button from './components/Button'

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
  render() {
    return (
      <Wrapper size="small">
        <Paper>
          <Header />
          <Status />
          <Button theme="green">Add Deposit</Button>
          <Button theme="red">Add Expense</Button>
        </Paper>
      </Wrapper>
    )
  }
}

export default App
