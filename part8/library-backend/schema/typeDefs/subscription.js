const { gql } = require('apollo-server-express')

const subscription = gql`
  type Subscription {
    bookAdded: Book!
  }
`

module.exports = subscription
