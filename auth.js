
var { checkToken } = require('./datasources/token-ds');


module.exports = async({ req }) => {

  const token = (req.headers && req.headers.authorization) || '';

  if(token.length) {
      const user = await checkToken(token);
      if(user) return Object.assign({}, req, {user: user})
  }

  // console.log(req.user);
  return req;
}
