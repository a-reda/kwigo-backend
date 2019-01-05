function sendMessage(code, text) {
  return {code: code, text: text}
}

module.exports = {

  Query: {
    user: (_, {id}, {dataSources}) =>  dataSources.userDS.getUserById(id),
    userByToken: (_, {token}, {dataSources}) => dataSources.userDS.getUserByToken(token),
    trips: (_, __, {dataSources}) => {
      return [{origin: "Milan", destination: "Padova"}] // Stub for testing
    },
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
    createTrip: async(_, trip, {dataSources}) => {
      const res = await dataSources.tripDS.createTrip(trip);
      if (!res) return sendMessage("NOK", "Error");
      else return sendMessage("OK", "Trip created");
      }
    }

}
