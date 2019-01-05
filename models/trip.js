var mongoose = require('mongoose');

var PlaceSchema = new mongoose.Schema({

  city: String,
  latitude: Number,
  longitude: Number,
  address: String,
  name: String

});

var TripSchema = new mongoose.Schema({

  departure: PlaceSchema,
  arrival: PlaceSchema,
  passengerCount: Number,
  price: Number,
  date: Number,
  driver: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}

},
{ collection: 'trips' }
);

mongoose.model('Trip', TripSchema);

module.exports = mongoose.model('Trip');