var express = require('express');
var app = express();
var mongoose = require('mongoose');


mongoose.connect('mongodb://yusifibrahimov:6701995y@ds037244.mongolab.com:37244/student_db');

var Schema = mongoose.Schema;

var personSchema = new Schema ({
	firstname: String,
	lastname: String,
	address: String
});

var Person = mongoose.model('Person', personSchema);

var john = Person({
	firstname: 'john',
	lastname: 'ibrahimov',
	address: 'melumat hesablama merkezi 55'
});

john.save(function (err){
	if(err) throw err;

	console.log('person saved');
});

var jane = Person({
	firstname: 'jane',
	lastname: 'ibragimov',
	address: 'melumat hesablama merkezi 555'
});

jane.save(function (err){
	if(err) throw err;

	console.log('person saved');
});


var apiController = require('./controllers/apiController');
var htmlController = require('./controllers/htmlController');

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use('/', function(req, res, next){
	console.log('Request Url:' + req.url);

	Person.find({}, function(err, users){
		if(err) throw err;
		console.log(users);
	});
  next();
});

htmlController(app);
apiController(app);


app.listen(port); 