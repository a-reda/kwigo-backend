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
  id: ID
  arrival: Place
  departure: Place
  driver: User
  passengerCount: Int
  price: Int
  date: Float
  passengers: [User]
}

type Place {
  city: String
  latitude: Float
  longitude: Float
  address: String
  name: String
}

input PlaceInput {
  city: String!
  latitude: Float!
  longitude: Float!
  address: String!
  name: String!
}

type ServerMessage {
  code: String
  text: String
}

type Query  {
  user(id: ID!): User
  userByToken(token: String): User
  me: User
  _resolveCity(lat: Float, lon: Float): ServerMessage
  searchTrips(departure: String!, arrival: String!, date: Float!): [Trip]
  getMyTrips: [Trip] @requireAuth
}

type Mutation {
  createUser(email: String!, password: String!, name: String!, car: String!, phone_number: String!): ServerMessage!
  createTrip(departure: PlaceInput, arrival: PlaceInput, passengersCount: Int, price: Int, date: Float): ServerMessage! @requireAuth
  login(email: String!, password: String!): ServerMessage!
}
`

module.exports = typeDefs;
