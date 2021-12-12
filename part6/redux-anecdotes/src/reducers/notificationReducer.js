const initialState = ''
let timeoutID

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

export const displayNotification = (message, second = 5) => {
  return async (dispatch) => {
    dispatch(setNotification(message))
    clearTimeout(timeoutID)

    await new Promise((resolve) => {
      timeoutID = setTimeout(
        () => resolve(dispatch(clearNotification())),
        second * 1000
      )
      return timeoutID
    })
  }
}

export default notificationReducer
