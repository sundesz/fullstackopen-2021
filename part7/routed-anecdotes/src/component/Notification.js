import React from 'react'

const Notification = ({ notification }) => {
  const notificationStyle = {
    padding: 10,
    margin: '10px 0',
    border: '2px solid',
    borderRadius: 5,
    fontSize: 25,
  }

  if (notification === '') {
    return null
  }
  return <div style={notificationStyle}>{notification}</div>
}

export default Notification
