const notify = ({ type, amount }) => (prevState, props) => {
  const ui = {
    ...prevState.ui,
    isActive: true,
    message:
      type === 'deposit'
        ? `You just deposited ${amount}`
        : type === 'insufficient_balance'
          ? 'Insufficient Balance'
          : `well spent ${amount}`
  }
  return { ui }
}

const close = () => (prevState, props) => {
  const ui = {
    ...prevState.ui,
    isActive: false
  }

  return { ui }
}

export default {
  notify,
  close
}
