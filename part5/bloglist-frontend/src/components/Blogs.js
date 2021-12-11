import React, { useRef } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blogs = ({ blogs, setBlogs, user, setNotification }) => {
  const togglableRef = useRef()

  const likeHandler = (blog) => async () => {
    const updateBlog = { id: blog.id, likes: blog.likes + 1 }
    const updatedBlog = await blogService.update(blog.id, updateBlog)

    const callback = () => {
      setBlogs(() => blogs.map((b) => (b.id === blog.id ? updatedBlog : b)))
    }

    afterRESTOperation(
      updatedBlog,
      `Liked blog "${blog.title}" by ${blog.author}`,
      callback
    )
  }

  const deleteHandler = (blog) => async () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      const deletedBlog = await blogService.remove(blog.id)

      const callback = () => {
        setBlogs(() => blogs.filter((b) => b.id !== blog.id))
      }
      afterRESTOperation(
        deletedBlog,
        `Blog "${blog.title}" by ${blog.author} has been deleted`,
        callback
      )
    }
  }

  const createHandler = async (newBlog) => {
    const savedBlog = await blogService.create(newBlog)

    const callback = () => {
      setBlogs(() => [
        ...blogs,
        { ...savedBlog, user: { username: user.username } },
      ])

      // only run toggleVisibility() when togglableRef.current is not null
      togglableRef.current && togglableRef.current.toggleVisibility()
    }

    afterRESTOperation(
      savedBlog,
      `A new blog "${savedBlog.title}" by ${savedBlog.author} added`,
      callback
    )
  }

  const afterRESTOperation = (object, successMessage, callback) => {
    if (object.error) {
      setNotification(object.error, 'error')
    } else {
      setNotification(successMessage, 'success')
      callback()
    }
  }

  const sortBlogByLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <Togglable buttonLabel='Create new blog' ref={togglableRef}>
        <BlogForm createHandler={createHandler} />
      </Togglable>

      <br />

      {blogs.sort(sortBlogByLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeHandler={likeHandler}
          deleteHandler={deleteHandler}
          user={user}
        />
      ))}
    </div>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  setNotification: PropTypes.func.isRequired,
}

export default Blogs
