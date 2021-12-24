const { gql } = require('apollo-server-express')

const bookType = gql`
  type Book {
    id: ID!
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  }
`
module.exports = bookType
