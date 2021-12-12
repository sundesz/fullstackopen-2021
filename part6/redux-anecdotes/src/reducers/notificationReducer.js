const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'RESET_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (notification) => ({
  type: 'SET_NOTIFICATION',
  payload: notification,
})

export const clearNotification = () => ({
  type: 'RESET_NOTIFICATION',
})

export const displayNotification = (dispatch, message) => {
  dispatch(setNotification(message))

  setTimeout(() => {
    dispatch(clearNotification())
  }, 5000)
}

export default notificationReducer
