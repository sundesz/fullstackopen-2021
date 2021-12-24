const { gql } = require('apollo-server-express')

const authorType = gql`
  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }
`
module.exports = authorType
