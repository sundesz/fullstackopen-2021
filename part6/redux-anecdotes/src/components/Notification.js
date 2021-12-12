import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notificationStyle = {
    border: '2px solid',
    borderRadius: 5,
    padding: 10,
    fontSize: 24,
  }

  if (props.notification === '') {
    return null
  }

  return <div style={notificationStyle}>{props.notification}</div>
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export default connect(mapStateToProps)(Notification)
