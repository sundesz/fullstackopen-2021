const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

loginRouter.post('/', async (req, res) => {
  const body = req.body

  if (!body.password) {
    return res.status(401).json({ error: 'Please enter a password' })
  }

  const user = await User.findOne({ username: body.username })
  let passwordCompare
  try {
    passwordCompare =
      user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)
  } catch (err) {
    return res
      .status(401)
      .json({ error: 'Invalid username or password (hash)' })
  }

  if (!user || !passwordCompare) {
    return res.status(401).json({ error: 'Invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, config.SECRET)

  res.status(200).json({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
