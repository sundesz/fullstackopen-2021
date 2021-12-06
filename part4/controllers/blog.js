const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    return res.json(blog)
  }

  res.status(404).end()
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body.like ? req.body : { ...req.body, likes: 0 }

  const blog = new Blog(body)
  const savedBlog = await blog.save()

  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id)
  if (blog) {
    return res.status(204).end()
  }

  res.status(404).json({ error: 'Id not found' })
})

blogsRouter.put('/:id', async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: 'query',
  })

  res.json(updatedBlog)
})

blogsRouter.put('/:id', async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: 'query',
  })

  res.json(updatedBlog)
})

module.exports = blogsRouter
