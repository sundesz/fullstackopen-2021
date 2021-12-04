const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknownEndpoint' })
}

const errorHandler = (err, req, res, next) => {
  next(err)
}

module.exports = {
  unknownEndpoint,
  errorHandler,
}
