import React from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import useField from '../hooks'
import { attributesForInput } from '../utils'
import { Redirect } from 'react-router-dom'

const Login = () => {
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()

  const username = useField('text', 'username')
  const password = useField('password', 'password')

  const submitHandler = async (e) => {
    e.preventDefault()

    dispatch(setUser({ username: username.value, password: password.value }))
  }
  if (user) {
    return <Redirect to={'/'} />
  }
  return (
    <div>
      <Form onSubmit={submitHandler}>
        <Form.Group as={Row} className='mb-3' controlId='formHorizontalEmail'>
          <Form.Label column sm={2}>
            Username
          </Form.Label>
          <Col sm={10}>
            <Form.Control {...attributesForInput(username)} />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className='mb-3'
          controlId='formHorizontalPassword'
        >
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control {...attributesForInput(password)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3'>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type='submit'>Sign in</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  )
}

export default Login
