import React from 'react'
import Alert from 'react-bootstrap/Alert'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const { message, type } = notification

  if (message === '') {
    return null
  }
  return (
    <>
      <Alert variant={type}>{message}</Alert>
      <br />
    </>
  )
}

export default Notification
