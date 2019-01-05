
var Trip = require('../models/trip')

function createTrip(trip) {
  return Trip.create(trip).catch((err) => console.log(err));
}

module.exports = {
  createTrip: createTrip
}
