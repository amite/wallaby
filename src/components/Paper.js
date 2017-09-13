import React from 'react'

const styles = {
  paper: {
    textAlign: 'center',
    background: '#ffffff',
    padding: '20px 30px',
    boxShadow:
      '0 14px 8px 0 rgba(0, 0, 0, 0.08), 0 9px 16px 4px rgba(0, 0, 0, 0.12)',
    position: 'relative',
    top: '40%',
    transform: 'translateY(-50%)',
    minHeight: '475px',
    borderRadius: '5px'
  }
}

const Paper = ({ children }) => <div style={styles.paper}>{children}</div>

export default Paper
