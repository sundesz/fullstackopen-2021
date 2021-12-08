const User = require('../models/user')

const initialUser = [
  {
    username: 'sandesh',
    name: 'sandesh',
    password: 'sandesh',
  },
]

const usersInDB = async () => {
  const users = await User.find({})

  return users.map((u) => u.toJSON())
}

module.exports = {
  initialUser,
  usersInDB,
}
