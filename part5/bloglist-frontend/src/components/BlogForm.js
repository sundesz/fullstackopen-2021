import React, { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, togglableRef, afterRESTOperation }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const titleHandler = (e) => setTitle(() => e.target.value)
  const authorHandler = (e) => setAuthor(() => e.target.value)
  const urlHandler = (e) => setUrl(() => e.target.value)

  const submitHandler = async (e) => {
    e.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }

    const savedBlog = await blogService.create(newBlog)

    const callback = () => {
      setBlogs(() => [...blogs, savedBlog])
      togglableRef.current.toggleVisibility()
    }

    afterRESTOperation(
      savedBlog,
      `A new blog "${savedBlog.title}" by ${savedBlog.author} added`,
      callback
    )
  }

  return (
    <div>
      <h1>Create a new blog</h1>

      <form onSubmit={submitHandler}>
        <div>
          Title:
          <input
            type='text'
            name='title'
            value={title}
            onChange={titleHandler}
          />
        </div>
        <div>
          Author:
          <input
            type='text'
            name='author'
            value={author}
            onChange={authorHandler}
          />
        </div>
        <div>
          Url:
          <input type='text' name='url' value={url} onChange={urlHandler} />
        </div>
        <button>Create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  togglableRef: PropTypes.object.isRequired,
  afterRESTOperation: PropTypes.func.isRequired,
}

export default BlogForm
