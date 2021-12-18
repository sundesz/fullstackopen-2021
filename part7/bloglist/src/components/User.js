import React, { useEffect } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { initializeUsers } from '../reducers/userReducer'

const User = () => {
  const id = useParams().id
  const selectedUser = useSelector((state) =>
    state.user.users.find((user) => user.id === id)
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  if (!selectedUser) {
    return <div>Loading ...</div>
  }

  return (
    <div>
      <h4>{selectedUser.name} added blogs</h4>

      <ListGroup>
        {selectedUser.blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default User
