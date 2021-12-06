const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blog')

app.use(cors())
app.use(express.json())
logger.info('Connecting to mongodb url', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to mongodb')
  })
  .catch((err) => {
    logger.error('Error connecting to mongodb: ', err.message)
  })

app.get('/', (req, res) => {
  res.send('<h1>Sandesh Hyoju - Bloglist</h1>')
})

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
