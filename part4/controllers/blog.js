const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body.like ? req.body : { ...req.body, likes: 0 }

  const blog = new Blog(body)
  const savedBlog = await blog.save()

  res.status(201).json(savedBlog)
})

module.exports = blogsRouter
