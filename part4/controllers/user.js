const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const config = require('../utils/config')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
  })
  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const body = req.body

  if (!(body.password && body.password.length > 3)) {
    return res
      .status(400)
      .json({ error: 'Password must be at least 3 characters' })
  }

  const passwordHash = await bcrypt.hash(body.password, Number(config.SALT))
  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await newUser.save()
  res.json(savedUser)
})

usersRouter.delete('/', async (req, res) => {
  await User.deleteMany()

  res.status(204).end()
})

module.exports = usersRouter
