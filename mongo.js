var config = require('config');
var mongoose = require('mongoose');

mongoose.connect(dbUrl, config.db.options);
mongoose.connection.on('connected', function() {
  console.log('MongoDB Connected!');
});
mongoose.connection.on('error', function() {
  throw 'MongoDB Connection Error';
});