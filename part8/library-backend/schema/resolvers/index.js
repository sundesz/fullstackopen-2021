const { UserInputError, AuthenticationError } = require('apollo-server-express')
const { PubSub } = require('graphql-subscriptions')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Author = require('../../models/author')
const Book = require('../../models/book')
const User = require('../../models/user')
const pubsub = new PubSub()

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
        if (args.author && args.author.length && !args.genre) {
          return await Book.find({ author: author._id }).populate('author')
        }

        if (args.genre && args.genre.length && !args.author) {
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
    favoriteGenreOfUser: async (root, args, context) => {
      return context.currentUser ? context.currentUser.favoriteGenre : ''
    },
    allGenres: async () => {
      const books = await Book.find({})
      return [...new Set(books.map((book) => book.genres).flat())]
    },
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name })
      return await Book.find({ author: author._id }).count()
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

      pubsub.publish('BOOK_ADDED', { bookAdded: response })
      return response
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      let author = null
      try {
        const findAuthor = await Author.findOne({ name: args.name })
        if (!findAuthor) {
          throw new UserInputError('Invalid author')
        }

        author = await Author.findByIdAndUpdate(
          findAuthor._id,
          { born: args.setBornTo },
          {
            new: true,
            runValidators: true,
            context: 'query',
          }
        )
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
}

module.exports = resolvers
