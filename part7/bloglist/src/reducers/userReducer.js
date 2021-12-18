import loginService from '../services/login'
import userService from '../services/users'
import { displayNotification } from './notificationReducer'

const initialState = {
  user: null,
  users: [],
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'UNSET_USER':
      return { ...state, user: initialState.user }
    case 'INIT_USERS':
      return { ...state, users: action.payload }
    default:
      return state
  }
}

export const initializeUser = (userInfo) => ({
  type: 'SET_USER',
  payload: userInfo,
})

export const unsetUser = () => ({ type: 'UNSET_USER' })

export const setUser = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const response = await loginService.login({ username, password })

      if (response.error) {
        window.localStorage.removeItem('userinfo')
        dispatch(displayNotification(response.error, 'danger'))
      } else {
        window.localStorage.setItem('userinfo', JSON.stringify(response))
        dispatch(initializeUser(response))
        dispatch(displayNotification(`${username} logged in`, 'success'))
      }
    } catch (err) {
      dispatch(displayNotification(err.message, 'danger'))
    }
  }
}

export const initializeUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll()
      dispatch({ type: 'INIT_USERS', payload: users })
    } catch (err) {
      dispatch(displayNotification(err.message, 'danger'))
    }
  }
}

export default userReducer
