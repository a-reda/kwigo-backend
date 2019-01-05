
var Trip = require('../models/trip')
var User = require('../models/user')

var ObjectId = require('mongoose').Types.ObjectId;

function createTrip(trip, user) {
  trip.driver = user;
  return Trip.create(trip).catch((err) => console.log(err));
}

function searchTrips(departure, arrival) {
  return Trip.find({
    "departure.city": new RegExp("^"+departure+"$", "i"),
    "arrival.city": new RegExp("^"+arrival+"$", "i"),
    }).populate('driver')
}

function getMyTrips(user) {
  return User.findOne({email: user.email}).then((res) => {
    return Trip.find({driver: new ObjectId(res._id)}).populate('driver')
  })
}

module.exports = {
  createTrip: createTrip,
  searchTrips: searchTrips,
  getMyTrips: getMyTrips
}
