import React from 'react'
import wallet from '../img/wallet.png'

const Header = () => {
  return (
    <header>
      <img src={wallet} alt="Wallet" id="logo" />
      <h1 className="title">Wallaby</h1>
    </header>
  )
}

export default Header
