var bcrypt = require('bcryptjs');
var uuid   = require('uuid');

const saltRounds = 10;

var User = require('../models/user')
var Token = require('../models/token')

function getUserById(user_id) {
  return User.findOne({id: user_id})
}

function createUser(email, password) {
  return User.findOne({email: email}).then((res) => {    // Look if user exists
    if(res) return {existant: true};                     // If yes, return flag to resolver
    else { // Else create it
      return bcrypt.hash(password, saltRounds).then((pwd) => {
          return User.create({email: email, password: pwd});
      });
    }
  });
}

function getUserByToken(token) {
  return Token.findOne({token: token}).then((res) => {
    if(res) return User.findOne({email: res.email});
    else return null;
  });
}

function login(email, password) {
  return User.findOne({email: email}).then((user) => {
    if (user) {
      return bcrypt.compare(password, user.password).then((res) => {
        if (res) {
          return Token.findOne({email: email}).then((res) => {
            if(res) {
              return {token: res.token};
            } else {
              let token = uuid.v4();
              Token.create({email: email, token: token});
              return {token: token};
            }
          })

        } else {
          return {msg: "Wrong password"};
        }
      })
    } else {
      return {msg: "Wrong username"};
    }
  })
}



module.exports = {

  getUserById: getUserById,
  getUserByToken: getUserByToken,
  createUser:  createUser,
  login: login

}
