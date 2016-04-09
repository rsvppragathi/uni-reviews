var config = require('./config.js');
var mongoose = require('mongoose');

mongoose.connect(config.db.url, config.db.options);

mongoose.connection.on('connected', function() {
  console.log('MongoDB Connected!');
});

mongoose.connection.on('error', function() {
  throw 'MongoDB Connection Error';
});