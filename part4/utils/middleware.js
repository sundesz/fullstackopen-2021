const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknownEndpoint' })
}

const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case 'ValidationError':
      return res.status(400).json({ error: err.message })
  }
  next(err)
}

module.exports = {
  unknownEndpoint,
  errorHandler,
}
