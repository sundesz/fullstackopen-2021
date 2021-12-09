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
        <BlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          togglableRef={togglableRef}
          afterRESTOperation={afterRESTOperation}
        />
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
