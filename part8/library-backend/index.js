require('dotenv').config()
const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

console.log('connecting to MongoDB')
mongoose
  .connect(process.env.MONGODB_URI)
  .then(function () {
    console.log('Connected to MongoDB')
  })
  .catch((err) => console.error('Error connecting to MongoDB: ', err.message))

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]
    me: User
  }

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

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let author
      if (args.author) {
        author = await Author.findOne({ name: args.author })
        if (!author) {
          throw new UserInputError('Author not found')
        }
      }

      try {
        if (args.author && !args.genre) {
          return await Book.find({ author: author._id }).populate('author')
        }

        if (args.genre && !args.author) {
          return await Book.find({ genres: { $in: args.genre } }).populate(
            'author'
          )
        }

        if (args.genre && args.author) {
          return await Book.find({
            author: author._id,
            genres: { $in: args.genre },
          }).populate('author')
        }
        return await Book.find({}).populate('author')
      } catch (error) {
        throw new Error(error.message)
      }
    },
    allAuthors: async () => {
      return await Author.find({})
    },
    me: async (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name })
      return await Book.find({ author: author._id }).count()
    },
  },
  Book: {
    author: async (root) => {
      const author = await Author.find({ name: root.author })
      return JSON.stringify(author)
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      let author
      let response = null
      try {
        author = await Author.findOne({ name: args.author })
        if (!author) {
          const newAuthor = new Author({ name: args.author })
          author = await newAuthor.save()
        }

        const newBook = new Book({ ...args, author })
        response = await newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return response
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      let author = null
      try {
        author = await Author.findOne({ name: args.name })
        if (!author) {
          throw new UserInputError('Invalid author')
        }

        author.born = args.setBornTo
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }

      return author
    },

    createUser: async (root, args) => {
      if (!args.username || !args.password) {
        throw new UserInputError('Please enter a username and password')
      }

      let user = null
      try {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(args.password, saltRounds)

        user = new User({
          username: args.username,
          passwordHash: passwordHash,
          favoriteGenre: args.favoriteGenre,
        })
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }

      return user
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user) {
        throw new UserInputError('Invalid username')
      }

      const comparePassword = await bcrypt.compare(
        args.password,
        user.passwordHash
      )
      if (!comparePassword) {
        throw new UserInputError('Invalid password')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      const jwtToken = jwt.sign(userForToken, process.env.JWT_SECRET)
      return { value: jwtToken }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
