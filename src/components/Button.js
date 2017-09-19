import React from 'react'

import glamorous from 'glamorous'
import { pure } from 'recompose'

const buttonTheme = {
  green: 'rgba(47, 196, 93, 0.94)',
  red: 'rgba(222, 28, 19, 0.94)'
}

const UnStyledButton = ({ disabled, ...rest }) => {
  return <button disabled={disabled !== undefined && !disabled} {...rest} />
}

const Button = glamorous(UnStyledButton)(
  {
    boxShadow:
      '0 16px 18px 0 rgba(0, 0, 0, 0.13), 0 4px 6px 0 rgba(0, 0, 0, 0.16)',
    borderRadius: '2px',
    border: 'none',
    color: '#fff',
    padding: '10px 15px',
    outline: 'none',
    cursor: 'pointer',
    opacity: '1',
    transition: 'opacity 150ms ease-in-out',
    letterSpacing: '0.04em',
    fontSize: '0.8em',
    marginTop: '10px',
    ':disabled': {
      opacity: '0.6',
      cursor: 'not-allowed'
    }
  },
  ({ theme }) => ({
    backgroundColor: theme === 'green' ? buttonTheme.green : buttonTheme.red,
    marginRight: theme === 'green' ? '10%' : '0'
  })
)

Button.displayName = 'Button'

export default pure(Button)
