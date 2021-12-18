import React, { useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { initializeUsers } from '../reducers/userReducer'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.user.users)
  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  if (users.length === 0) {
    return <div>Loading ...</div>
  }

  return (
    <div>
      <Table striped hover>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.length ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))
          ) : (
            <tr key='1'>
              <td>No users yet</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
