const jwt = require('jsonwebtoken')
const config = require('./config')

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknownEndpoint' })
}

const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case 'TypeError':
      return res.status(400).json({ error: err.name })
    case 'JsonWebTokenError':
      return res.status(400).json({ error: err })
    case 'CastError':
      return res.status(400).json({ error: 'malformatted id' })
    case 'ValidationError':
      return res.status(400).json({ error: err.message })
  }
  next(err)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  req.token =
    authorization && authorization.toLowerCase().startsWith('bearer')
      ? authorization.substring(7)
      : null

  next()
}

const userExtractor = (req, res, next) => {
  if (req.token) {
    const decodedToken = jwt.verify(req.token, config.SECRET)
    req.user = decodedToken ? decodedToken : null
  } else {
    req.user = null
  }

  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
}
