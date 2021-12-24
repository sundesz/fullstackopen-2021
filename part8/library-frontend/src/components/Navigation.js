import { useApolloClient } from '@apollo/client'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import Container from 'react-bootstrap/Container'

const Navigation = ({ token, setToken }) => {
  const history = useHistory()
  const client = useApolloClient()
  const logoutHandler = () => {
    window.localStorage.clear()
    client.resetStore()
    setToken(null)
    history.push('/')
  }

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            Library
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link as={Link} to='/authors'>
                Authors
              </Nav.Link>
              <Nav.Link as={Link} to='/books'>
                Books
              </Nav.Link>

              {token && (
                <Nav.Link as={Link} to='/addbook'>
                  Add Book
                </Nav.Link>
              )}
              {token && (
                <Nav.Link as={Link} to='/recommend'>
                  Recommend
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className='justify-content-end'>
            {token ? (
              <Navbar.Text>
                <button onClick={logoutHandler}>Logout</button>
              </Navbar.Text>
            ) : (
              <Nav.Link as={Link} to='/login'>
                Login
              </Nav.Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
    </>
  )
}

export default Navigation
