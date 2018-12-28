
const dbHost = 'localhost:27017';
const dbName = 'kwigo'
const dbUser = 'backend';
const dbPassword = '***REMOVED***';

module.exports =  {
   dbUrl: `mongodb://${dbUser}:${dbPassword}@${dbHost}/${dbName}`,
   dbHost: dbHost,
   dbUser: dbUser,
   dbPassword: dbPassword
}
