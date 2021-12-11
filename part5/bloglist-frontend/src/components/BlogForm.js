import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createHandler }) => {
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
    createHandler(newBlog)

    setTitle(() => '')
    setAuthor(() => '')
    setUrl(() => '')
  }

  return (
    <div>
      <h1>Create a new blog</h1>

      <form id='blogForm' onSubmit={submitHandler}>
        <div>
          Title:
          <input
            id='title'
            type='text'
            name='title'
            value={title}
            onChange={titleHandler}
          />
        </div>
        <div>
          Author:
          <input
            id='author'
            type='text'
            name='author'
            value={author}
            onChange={authorHandler}
          />
        </div>
        <div>
          Url:
          <input
            id='url'
            type='text'
            name='url'
            value={url}
            onChange={urlHandler}
          />
        </div>
        <button id='create-blog'>Create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createHandler: PropTypes.func.isRequired,
}

export default BlogForm
