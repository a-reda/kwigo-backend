const {gql} = require('apollo-server');

const typeDefs = gql`

directive @requireAuth on FIELD_DEFINITION

type User {
  id: ID!
  name: String
  email: String
  password: String
}

type Trip {
  origin: String
  destination: String
  driver: User
  spots: String
  passengers: [User]
}

type ServerMessage {
  code: String
  text: String
}

type Query  {
  user(id: ID!): User
  userByToken(token: String): User
  trips: [Trip] @requireAuth
  me: User
}

type Mutation {
  createUser(email: String!, password: String!): ServerMessage!
  login(email: String!, password: String!): ServerMessage!
}
`

module.exports = typeDefs;
