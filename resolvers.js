function sendMessage(code, text) {
  return {code: code, text: text}
}

module.exports = {

  Trip: {
    id: (parent) => parent._id.toString(),
    departure: (parent) => parent.departure,
    arrival: (parent) => parent.arrival,
    driver: (parent) => parent.driver
  },

  User: {
    id: (parent) => parent._id.toString()
  },

  Query: {
    user: (_, {id}, {dataSources}) =>  dataSources.userDS.getUserById(id),
    userByToken: (_, {token}, {dataSources}) => dataSources.userDS.getUserByToken(token),
    searchTrips: (_, {departure, arrival, date}, {dataSources}) => dataSources.tripDS.searchTrips(departure, arrival, date),
    getMyTrips: (_, __, {dataSources, user}) => dataSources.tripDS.getMyTrips(user),
    registeredTrips: (_, __, {dataSources, user}) => dataSources.tripDS.registeredTrips(user),
    findTripById: (_, {id}, {dataSources}) => dataSources.tripDS.findTripById(id),
    _resolveCity: (_, {lat,lon}, {dataSources}) => dataSources.geoDS.getCityName(lat,lon)
  },

  Mutation: {
    createUser: async(_, user, {dataSources}) => {
      const res = await dataSources.userDS.createUser(user);
      if (res.existant) return sendMessage("NOK","User exists already");
      else if (!res) return sendMessage("NOK","Server problem");
      else return sendMessage("OK","User created !");
    },
    login: async(_, {email, password}, {dataSources}) => {
      const token = await dataSources.userDS.login(email, password);
      if (token.token) return sendMessage("TOKEN", token.token);
      else return sendMessage("UNAUTHORIZED", "Couldn't validate credentials "+token.msg);
    },
    createTrip: async(_, trip, {dataSources, user}) => {
      const res = await dataSources.tripDS.createTrip(trip, user);
      if (!res) return sendMessage("NOK", "Error");
      else return sendMessage("OK", "Trip created");
    },
    register: async(_, {tripId}, {dataSources, user}) => {
      const res = await dataSources.tripDS.register(tripId, user);
      if (!res) return sendMessage("NOK", "Error");
      else return res;
      }
    }

}
