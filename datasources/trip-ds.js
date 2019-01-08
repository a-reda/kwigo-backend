
var Trip = require('../models/trip')
var User = require('../models/user')

var ObjectId = require('mongoose').Types.ObjectId;

function createTrip(trip, user) {
  console.log(trip);
  trip.driver = user;
  return Trip.create(trip).catch((err) => console.log(err));
}

function searchTrips(departure, arrival, date) {
  return Trip.find({
    "departure.city": new RegExp("^"+departure+"$", "i"),
    "arrival.city": new RegExp("^"+arrival+"$", "i")
  }).populate('driver')
    .then((trips) => {
      console.log(trips.length)
      console.log(date)
      const qd = new Date(date);
      console.log(qd)
      console.log(trips.length)
      var sameDate = [];
      trips.map((t) => {
        var rd = new Date(t.date)
        console.log(rd, t.id, rd.getDate(), qd.getDate())
        if(rd.getDate() == qd.getDate() && rd.getMonth() == qd.getMonth() && rd.getYear() == qd.getYear()){
          sameDate.push(t)
        }
      })
      return sameDate
    })

}

function registeredTrips(user) {
  return Trip.find({passengers: user});
}

function getMyTrips(user) {
  return User.findOne({email: user.email}).then((res) => {
    return Trip.find({driver: new ObjectId(res._id)}).populate('driver')
  })
}

function findTripById(id) {
  return Trip.findById(id).populate('driver');
}

function register(tripId, user) {
  return Trip.findById(tripId).then((trip) => {
    if(!trip){
      return({code: "NOK", text: "Trip not found"})
    } else if(trip.passengers.length >= trip.passengersCount) {
      return({code: "NOK", text: "Trip full"})
    } else {
      var flag = false;
      for (var i = 0; i < trip.passengers.length; i++) {
        flag = user._id.toString() == trip.passengers[i].toString();
      }
      if(flag && false) return({code: "NOK", text: "Already registered"})
      else return Trip.updateOne(trip, { $push: { passengers: user }})
           .then((res) => ({code: "OK", text: "Passenger registered"}))
    }
  });
}

module.exports = {
  createTrip: createTrip,
  searchTrips: searchTrips,
  getMyTrips: getMyTrips,
  findTripById: findTripById,
  register: register,
  registeredTrips: registeredTrips
}
