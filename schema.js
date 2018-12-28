const {gql} = require('apollo-server');

const typeDefs = gql`

type User {
  id: ID!
  name: String
}

type Trip {
  origin: String
  destination: String
  driver: User
  spots: String
  passengers: [User]
}

type Query {
  user(id: ID!): User
  me: User
}



`





module.exports = typeDefs;
