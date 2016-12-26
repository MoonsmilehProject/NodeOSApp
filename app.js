
// Dependencies and setup

var express = require('express'),
	app = express(),
	MongoClient = require('mongodb').MongoClient,
	port = Number(process.env.PORT || 8080),
    assert = require('assert');

var bodyParser = require('body-parser');

var myDB;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// Routes
app.get('/chat-api/getUserList', function(req, res) {

    MongoClient.connect('mongodb://localhost:27017/chatiw', function(err,db){
        assert.equal(null, err);
        console.log("Successfully connected to mongoDB");
        db.collection('users').find({}).toArray(function(err,docs){
            console.log(docs);  
            var users = {"users":docs,"messageCode":200, "response":"User list found, u're welcome"};
            res.send(users);

        });
    });
	
	var usersObject = {"users":[{"name":"Aldair Guillermo Avalos Sanchéz", "idUser":"al102@gmail.com"},
								   {"name":"Ximena Flores Acevedo", "idUser":"xla10@gmail.com"},
								   {"name":"Andrea López Silva", "idUser":"andyLove@gmail.com"},
								   {"name":"Amairani Perez Casas"}], "messageCode":200, "response":"User list found, u're welcome"};
	;
});


app.post('/payment', function(req,res) {
	console.log('JSON Received: '+req.body);
	console.log('Name: '+req.body.name);
});

app.listen(port, function(){
	console.log('Listening in port: '+port);
});