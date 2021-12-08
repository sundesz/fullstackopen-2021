import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, setNotification }) => {
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
    if (savedBlog) {
      setBlogs(() => [...blogs, savedBlog])
      setNotification(
        `A new blog "${savedBlog.title}" by ${savedBlog.author} added`,
        'success'
      )
    }
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

export default BlogForm
