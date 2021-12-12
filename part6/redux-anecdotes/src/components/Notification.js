import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  const notificationStyle = {
    border: '2px solid',
    borderRadius: 5,
    padding: 10,
    fontSize: 24,
  }

  if (notification === '') {
    return null
  }

  return <div style={notificationStyle}>{notification}</div>
}

export default Notification
