import glamorous from 'glamorous'

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

Wrapper.displayName = 'Wrapper'

export default Wrapper
