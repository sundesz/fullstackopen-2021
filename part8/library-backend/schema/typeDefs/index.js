const { authorType, bookType, userType } = require('./types')
const query = require('./query')
const mutation = require('./mutation')
const subscription = require('./subscription')

const typeDefs = [authorType, bookType, userType, query, mutation, subscription]

module.exports = typeDefs
