var express    			= require('express');
var path    			= require('path');
var app        			= express();
var bodyParser 			= require('body-parser');
var mongoConfig   		= require('./mongo-config.js');
var mongoose   			= require('mongoose');
var async      			= require('async');
var config     			= require('./config.js');
var moment				= require('moment');


//reading data in the requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 9000;
var router = express.Router();

//Question Schema
var questionSchema = mongoose.Schema({
  data: String,
  user_id: String,
  school_id: String,
  answers: Array,
  categories: Array,
  createdAt: Date
});

questionSchema.pre('save', function(callback){
  if (!this.createdAt) { this.createdAt = moment.utc(); }
  callback();
});

var Question = mongoose.model('Question', questionSchema);


router.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

router.get('/questions', function(req, res) {
	Question.find({}, function(err, questions){
		if(err) next(err);
		res.json(questions);
	});
});

router.post('/question', function(req, res) {
	var question = new Question({
		data: req.body.data,
		answers: [],
		categories: req.body.categories
	});
	question.save(function(err, question){
		if(err) next(err);
		res.json(question);
	});
});


router.get('/search/:query', function(req, res) {
	Question.find({ $text: { $search: req.params.query } }, function(err, results){
		if(err) next(err);
		res.json(results);
	});
});


app.use(express.static('public'));
app.use('/api', router);

app.listen(port);
console.log('UniReviews running on port ' + port);