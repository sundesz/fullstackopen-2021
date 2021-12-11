const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blog')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')

app.use(cors())
app.use(express.json())
logger.info('Connecting to mongodb url', config.MONGODB_URI)

const connectMongoose = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI)
    logger.info('Connected to mongodb')
  } catch (err) {
    logger.error('Error connecting to mongodb: ', err.message)
  }
}

connectMongoose()

app.get('/', (req, res) => {
  res.send('<h1>Sandesh Hyoju - Bloglist</h1>')
})

app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
