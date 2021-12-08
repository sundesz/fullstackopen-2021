import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'

const Blogs = ({ blogs, setBlogs, setNotification }) => {
  return (
    <div>
      <BlogForm
        blogs={blogs}
        setBlogs={setBlogs}
        setNotification={setNotification}
      />
      <br />
      <br />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default Blogs
