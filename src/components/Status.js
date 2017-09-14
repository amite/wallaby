import React from 'react'
import glamorous from 'glamorous'

const UnstyledStatus = ({ balance, ...rest }) => {
  return <p {...rest}>Current Balance: {balance}</p>
}

const Status = glamorous(UnstyledStatus)({
  fontSize: '1.2em',
  color: '#5189ab',
  border: '2px dashed #e3e3e3',
  padding: '1.2em',
  maxWidth: '70%',
  margin: '20px auto'
})

export default Status
