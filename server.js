var express    			= require('express');
var path    			= require('path');
var app        			= express();
var bodyParser 			= require('body-parser');
var mongoConfig   		= require('./mongo-config.js');
var mongoose   			= require('mongoose');
var async      			= require('async');
var config     			= require('./config.js');


//reading data in the requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 9000;
var router = express.Router();



router.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use(express.static('public'));
app.use('/api', router);

app.listen(port);
console.log('UniReviews running on port ' + port);