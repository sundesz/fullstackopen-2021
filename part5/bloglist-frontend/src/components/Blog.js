import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ user, blog, likeHandler, deleteHandler }) => {
  const [visible, setVisible] = useState(false)
  const toggleView = () => {
    setVisible(() => !visible)
  }

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  return (
    <div className='blog-container'>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} &nbsp;
        <button onClick={toggleView}>View</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.title} &nbsp; <button onClick={toggleView}>Hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} &nbsp;
          <button onClick={likeHandler(blog)}>Like</button>
        </div>
        <div>{blog.author}</div>

        <br />
        {user.username === blog.user.username && (
          <button onClick={deleteHandler(blog)}>Delete</button>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  likeHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
}

export default Blog
