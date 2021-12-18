import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { displayNotification } from '../reducers/notificationReducer'
import { unsetUser } from '../reducers/userReducer'

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  const history = useHistory()

  const logoutHandler = () => {
    dispatch(displayNotification(`${user.username} logged out`, 'success'))
    dispatch(unsetUser())
    window.localStorage.removeItem('userinfo')
    history.push('/')
  }

  return (
    <>
      <Navbar bg='primary' variant='dark' expand='lg'>
        <Container>
          <Navbar.Brand href='/'>Blog app</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link as={Link} to='/blogs'>
                Blogs
              </Nav.Link>

              <Nav.Link as={Link} to='/users'>
                Users
              </Nav.Link>
            </Nav>

            <Nav>
              {user ? (
                <>
                  <Navbar.Text>
                    Signed in as: {user.username}{' '}
                    <Button variant='outline-warning' onClick={logoutHandler}>
                      Logout
                    </Button>
                  </Navbar.Text>
                </>
              ) : (
                <Nav.Link as={Link} to='/login'>
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Navigation
