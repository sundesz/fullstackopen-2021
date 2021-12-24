const { gql } = require('apollo-server-express')

const userType = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
`
module.exports = userType
