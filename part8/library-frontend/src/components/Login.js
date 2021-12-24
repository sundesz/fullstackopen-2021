import { useMutation } from '@apollo/client'
import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'
import useField from '../hooks'
import { LOGIN } from '../queries'
import { inputAttributes } from '../utils'

const Login = ({ displayNotification, setToken }) => {
  const username = useField('text', 'username')
  const password = useField('password', 'password')
  const history = useHistory()

  const [login] = useMutation(LOGIN, {
    onError: (err) => {
      displayNotification(err.graphQLErrors[0].message, 'danger')
    },
  })

  const loginHandler = async (e) => {
    e.preventDefault()
    try {
      const loginData = await login({
        variables: { username: username.value, password: password.value },
      })

      if (loginData.errors) {
        displayNotification(loginData.errors.message, 'danger')
      } else {
        setToken(loginData.data.login.value)
        window.localStorage.setItem('userinfo', loginData.data.login.value)
        history.push('/')
      }
    } catch (error) {
      window.localStorage.removeItem('userinfo')
      setToken(null)
      displayNotification(error.message, 'danger')
    }
  }

  return (
    <div>
      <Form onSubmit={loginHandler}>
        <Form.Group className='mb-3' controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control {...inputAttributes(username)} placeholder='Username' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control {...inputAttributes(password)} placeholder='Password' />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Login
        </Button>
      </Form>
    </div>
  )
}

export default Login
