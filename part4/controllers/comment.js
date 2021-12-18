const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const User = require('../models/user')
const Blog = require('../models/blog')

commentsRouter.get('/', async (req, res) => {
  const data = await Comment.find({})
  res.json(data)
})

commentsRouter.post('/', async (req, res) => {
  const loggedInUser = req.user

  if (!loggedInUser) {
    return res.status(401).json({ error: 'invalid or missing token' })
  }

  const user = await User.findById(loggedInUser.id)

  if (!user) {
    res.status(401).json({ error: 'User not found' })
  }

  const body = req.body
  const blog = await Blog.findById(body.blogId)

  if (!blog) {
    res.status(401).json({ error: 'Blog not found' })
  }

  const comment = new Comment({
    comment: body.comment,
    blog: body.blogId,
    user: user._id,
  })

  const savedComment = await comment.save()
  blog.comments = [...blog.comments, savedComment._id]
  await blog.save()

  res.json(savedComment)
})

module.exports = commentsRouter
