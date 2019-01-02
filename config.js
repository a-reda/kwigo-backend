
const port = process.env.PORT || 4000;

const db = process.env.KWIGO ? 'kwigo-mongo' : 'camus.duckdns.org';

const dbHost = db+':27017';
const dbName = 'kwigo'
const dbUser = 'backend';
const dbPassword = '***REMOVED***';

module.exports =  {
   port: port,
   dbUrl: `mongodb://${dbUser}:${dbPassword}@${dbHost}/${dbName}`,
   dbHost: dbHost,
   dbUser: dbUser,
   dbPassword: dbPassword
}
