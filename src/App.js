import React, { Component } from 'react'

import wallet from './img/wallet.png'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="paper">
          <header>
            <img src={wallet} alt="Wallet" id="logo" />
            <h1 className="title">Wallaby</h1>
          </header>
          <p className="status">Current Balance: 1,00,000</p>
          <button className="deposit">Add Deposit</button>
          <button className="withdraw">Add Expense</button>
        </div>
      </div>
    )
  }
}

export default App
