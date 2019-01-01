
function sendMessage(code, text) {
  return {code: code, text: text}
}


module.exports = {

  Query: {
    user: (_, {id}, {dataSources}) =>  dataSources.userDS.getUserById(id),
    userByToken: (_, {token}, {dataSources}) => dataSources.userDS.getUserByToken(token),
    trips: (_, __, {dataSources}) => {
      return [{origin: "Milan", destination: "Padova"}] // Stub for testing
    }
  },

  Mutation: {
    createUser: async(_, {email, password}, {dataSources}) => {
      const user = await dataSources.userDS.createUser(email, password);
      if (user.existant) return sendMessage("NOK","User exists already");
      else if (!user) return sendMessage("NOK","Server problem");
      else return sendMessage("OK","User created !");
    },
    login: async(_, {email, password}, {dataSources}) => {
      const token = await dataSources.userDS.login(email, password);
      if (token.token) return sendMessage("TOKEN", token.token);
      else return sendMessage("UNAUTHORIZED", "Couldn't validate credentials "+token.msg);
      }
    }

}
