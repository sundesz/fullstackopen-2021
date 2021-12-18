import React, { useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import { deleteBlog, initializeBlogs, likeBlog } from '../reducers/blogReducer'
import Comments from './Comments'

const Blog = () => {
  const id = useParams().id
  const user = useSelector((state) => state.user.user)
  const selectedBlog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  )
  const dispatch = useDispatch()

  // TODO: don't know why this method doesn't work
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  if (!selectedBlog) {
    return <Redirect to={'/blogs'} />
  }

  const likeHandler = (blog) => async () => {
    const obj = { id: blog.id, likes: blog.likes + 1 }

    dispatch(likeBlog(blog.id, obj))
  }

  const deleteHandler = (blog) => async () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
    }
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>
            {selectedBlog.title} {selectedBlog.author}
          </Card.Title>

          <Card.Text>
            <a href={selectedBlog.url} target='_blank' rel='noreferrer'>
              {selectedBlog.url}
            </a>
          </Card.Text>
          <Card.Text>
            {selectedBlog.likes} likes &nbsp;&nbsp;&nbsp;
            {user && (
              <Button
                variant='primary'
                size='sm'
                onClick={likeHandler(selectedBlog)}
              >
                Like
              </Button>
            )}
          </Card.Text>
          <Card.Text>added by {selectedBlog.user.username}</Card.Text>
        </Card.Body>
        {user && (
          <Card.Footer>
            <Button
              variant='danger'
              size='sm'
              onClick={deleteHandler(selectedBlog)}
            >
              Delete
            </Button>
          </Card.Footer>
        )}
      </Card>

      <Comments blog={selectedBlog} />
    </div>
  )
}

export default Blog
