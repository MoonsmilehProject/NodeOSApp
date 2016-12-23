
// Dependencies and setup

var express = require('express'),
	app = express(),
	MongoClient = require('mongodb').MongoClient,
	port = Number(process.env.PORT || 8080),
    assert = require('assert');

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// Routes
app.get('/', function(req, res) {
	res.send('Server is alive');
});


app.post('/payment', function(req,res) {
	console.log('JSON Received: '+req.body);
	console.log('Name: '+req.body.name);
});

MongoClient.connect('mongodb://localhost:27017/video', function(err,db){
	assert.equal(null, err);
	console.log("Successfully connected to mongoDB");
	app.get('/movies', function(req, res){
		db.collection('movies').find({}).toArray(function(err,docs){
			//res.render('movies', {'movies':docs});
			res.json(docs);
		});
	});
});


app.listen(port, function(){
	console.log('Listening in port: '+port);
});