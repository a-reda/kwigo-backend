var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({

  id: String,
  name: String

},
{ collection: 'users' }
);

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
