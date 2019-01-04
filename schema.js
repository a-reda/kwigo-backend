const {gql} = require('apollo-server');

const typeDefs = gql`

directive @requireAuth on FIELD_DEFINITION

type User {
  id: ID!
  name: String
  email: String
  password: String
  phone: String
  car: String
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
  _resolveCity(lat: Float, lon: Float): ServerMessage
}

type Mutation {
  createUser(email: String!, password: String!, name: String!, car: String!, phone_number: String!): ServerMessage!
  login(email: String!, password: String!): ServerMessage!
}
`

module.exports = typeDefs;
