const { gql } = require('apollo-server-express')

const query = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]
    me: User
    favoriteGenreOfUser: String!
    allGenres: [String]
  }
`

module.exports = query
