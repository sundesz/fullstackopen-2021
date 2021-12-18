const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 })
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
  const loggedInUser = req.user

  if (!loggedInUser) {
    return res.status(401).json({ error: 'invalid or missing token' })
  }

  const user = await User.findById(loggedInUser.id)

  if (!user) {
    res.status(401).json({ error: 'User not found' })
  }

  const body = req.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  })
  const savedBlog = await blog.save()

  user.blogs = [...user.blogs, savedBlog._id]
  await user.save()

  res.status(201).json(savedBlog)
})

blogsRouter.post('/:id/comments', async (req, res) => {
  const loggedInUser = req.user

  if (!loggedInUser) {
    return res.status(401).json({ error: 'invalid or missing token' })
  }

  const user = await User.findById(loggedInUser.id)

  if (!user) {
    res.status(401).json({ error: 'User not found' })
  }

  const body = req.body
  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    res.status(401).json({ error: 'Blog not found' })
  }

  const comment = new Comment({
    comment: body.comment,
    blog: blog._id,
    user: user._id,
  })

  const savedComment = await comment.save()
  blog.comments = [...blog.comments, savedComment._id]
  await blog.save()

  res.json(savedComment)
})

blogsRouter.delete('/:id', async (req, res) => {
  const loggedInUser = req.user
  if (!loggedInUser) {
    return res.status(401).json({ error: 'invalid or missing token' })
  }

  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    return res.status(401).json({ error: 'blog not found' })
  }

  if (!blog.user || blog.user.toString() === loggedInUser.id) {
    await Blog.findByIdAndDelete(blog.id)
    await Comment.deleteMany({ blog: blog.id })
    return res.status(204).end()
  }

  res.status(401).json({ error: 'blog can be deleted only by its author' })
})

blogsRouter.delete('/', async (req, res) => {
  await Blog.deleteMany()
  await Comment.deleteMany()
  res.status(204).end()
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
