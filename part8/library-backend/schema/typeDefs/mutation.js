const { gql } = require('apollo-server-express')

const mutation = gql`
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(
      username: String!
      favoriteGenre: String!
      password: String!
    ): User
    login(username: String!, password: String!): Token
  }
`

module.exports = mutation
