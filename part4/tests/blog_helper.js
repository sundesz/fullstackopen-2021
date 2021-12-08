const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Blog 1',
    author: 'Luniva',
    url: 'http://blog.com',
    likes: 20,
  },
  {
    title: 'How to be happy',
    author: 'Sandesh ',
    url: 'http://sandesh.com',
    likes: 40,
  },
]

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map((b) => b.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDB,
}
