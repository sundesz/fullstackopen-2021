let notificationTimeoutID
const initialState = {
  message: '',
  type: '',
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'RESET_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const setNotification = (message, type = 'success') => ({
  type: 'SET_NOTIFICATION',
  payload: { message, type },
})

export const resetNotification = () => ({
  type: 'RESET_NOTIFICATION',
})

export const displayNotification = (message, type) => {
  return async (dispatch) => {
    dispatch(setNotification(message, type))
    clearTimeout(notificationTimeoutID)

    await new Promise((resolve) => {
      notificationTimeoutID = setTimeout(
        () => resolve(dispatch(resetNotification())),
        5000
      )

      return notificationTimeoutID
    })
  }
}

export default notificationReducer
