import React, { useEffect, useRef } from 'react'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import { createBlog, initializeBlogs } from '../reducers/blogReducer'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const togglableRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const createHandler = async (newBlog) => {
    dispatch(createBlog(newBlog))

    togglableRef.current && togglableRef.current.toggleVisibility()
  }

  const sortBlogByLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      {user && (
        <Togglable buttonLabel='Create new blog' ref={togglableRef}>
          <BlogForm createHandler={createHandler} />
        </Togglable>
      )}
      <br />

      <Table striped hover>
        <tbody>
          {blogs.length ? (
            blogs.sort(sortBlogByLikes).map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </td>
                <td>{blog.author}</td>
              </tr>
            ))
          ) : (
            <tr key='1'>
              <td>No blogs yet</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Blogs
