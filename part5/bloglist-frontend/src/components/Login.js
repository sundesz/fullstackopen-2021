import React, { useState } from 'react'
import PropTypes from 'prop-types'
import loginService from '../services/login'

const Login = ({ setUser, setNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()

    const loginInfo = await loginService.login({ username, password })
    if (loginInfo.error) {
      setNotification(loginInfo.error, 'error')
    } else {
      setUser(() => loginInfo)
      window.localStorage.setItem('userinfo', JSON.stringify(loginInfo))

      setNotification(`${loginInfo.username} logged in`, 'success')
    }
  }

  return (
    <div>
      <h1>Login to application</h1>
      <form onSubmit={submitHandler}>
        <div>
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(() => e.target.value)}
          />
        </div>
        <div>
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(() => e.target.value)}
          />
        </div>

        <button>Login</button>
      </form>
    </div>
  )
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
}

export default Login
