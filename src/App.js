import React, { Component } from 'react'

import Paper from './components/Paper'
import Header from './components/Header'
import Status from './components/Status'
import Button from './components/Button'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Paper>
          <Header />
          <Status />
          <Button className="deposit">Add Deposit</Button>
          <Button className="withdraw">Add Expense</Button>
        </Paper>
      </div>
    )
  }
}

export default App
