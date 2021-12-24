import React from 'react'
import Alert from 'react-bootstrap/Alert'

const Notification = ({ message, type }) => {
  if (message === '') {
    return null
  }

  if (type === 'success') {
    return <Alert variant='success'>{message}</Alert>
  }
  return <Alert variant='danger'>{message}</Alert>
}

export default Notification
