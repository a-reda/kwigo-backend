const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const config = require('./config')

// GraphQL Definitions
const typeDefs = require('./schema');



// MongoDB Connection
mongoose.connect(config.dbHost, {useNewUrlParser: true});

mongoose.connection.on('open', () => console.log('DB CONNECTION OK'));
mongoose.connection.on('error', () => console.log('DB CONNECTION ERROR'));

// GraphQL server boot
const server = new ApolloServer({typeDefs});

server.listen().then(({url}) => {
  console.log(`\n\n 🚀     Server ready at ${url} \n\n`);
});
