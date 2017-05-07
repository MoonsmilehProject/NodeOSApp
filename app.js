
// Dependencies and setup

var express = require('express'),
	app = express(),
	MongoClient = require('mongodb').MongoClient,
	port = Number(process.env.PORT || 8080),
    assert = require('assert')
    bodyParser = require('body-parser');

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended:true}));

var conekta = require('conekta');
var dbInstance;
var usersCollection = 'users';

function connectDB() {
	MongoClient.connect('mongodb://localhost:27017/olimpiadasespeciales', function(err,db){
		assert.equal(null, err);
		dbInstance = db;
		console.log('Successfully connected to MongoDB');
	});
}

// Routes
app.post('/api/login/user.json', function(req, res){
  var userdata = req.body;
  console.log('Online user: '+userdata.userId);
  dbInstance.collection(usersCollection).find({email:userdata.userId}).toArray(function(err,docs){
      if(docs[0] == undefined) {
        console.log('User not found');
        var error = {'messageCode':404, 'response':'Login fail, user not found'};
        res.send(error);
      } else {
        console.log('User found');
        var users = {'messageCode':200, 'response':'Login OK, user found', 'user': docs[0]};
        res.send(users);
      }
  });
});

app.post('/api/register/user.json', function(req, res) {
  var user = req.body;
  dbInstance.collection(usersCollection).find({email: user.email}).toArray(function(err, docs){
      if(docs[0] == undefined) {
        // Insert new user
        dbInstance.collection(usersCollection).insertOne({name:user.name, lastname:user.lastname, email: user.userId, birthday: user.birthday, isAdmin: false},function(err,db){
          console.log('DB response: '+db[0]);
          console.log('New user inserted');
          var users = {'messageCode':200, 'response':'Register OK, new user inserted'};
          res.send(users);
          });
      }
  });
});

app.post('/api/donate/card.json', function(req, response) {
	var userdata = req.body;
	console.log('Payment received by: '+ userdata.username);
	conekta.api_key = "key_gwFSd2HtH6AAS7V6h1LaHA";
	conekta.Charge.create({
    	"description":"Stogies",
  		"amount": userdata.amount,
  		"currency":"MXN",
  		"reference_id":"2017-donacion_app",
  		"card": userdata.tokenCard,
  		"details": {
    		"name": userdata.username,
    		"phone": userdata.phone,
    		"email": userdata.email,
    		"customer": {
      			"logged_in": true,
      			"successful_purchases": 1,
      			"created_at": 1379784950,
      			"updated_at": 1379784950,
      			"offline_payments": 0,
      			"score": 10
    		},
    		"line_items": [{
      			"name": "Donativo a Olimpiadas Especiales",
      			"description": "Donativo por transacción bancaria al programa Olimpiadas Especiales de México.",
      			"unit_price": userdata.amount,
      			"quantity": 1,
      			"sku": "donativo_app",
      			"category": "Donaciones"
    		}],
    		"billing_address": {
      			"street1":"Av del conscripto s/n, col. Lomas de sotelo",
      			"street2": "Delegación Miguel Hidalgo",
      			"street3": null,
      			"city": "Ciudad de México",
      			"state":"",
      			"zip": "11200",
      			"country": "México",
      			"tax_id": "OEM870708JI2",
      			"company_name":"Olimpiadas Especiales de Mexico AC",
      			"phone": "5255-0359",
      			"email": "jcruz@olimpiadasespeciales.org.mx"
    		}
  		}
	}, function(err, res) {
		if(res != null){
			console.log("Response from server: ");
    		console.log(res.toObject());
    		if(res.toObject().failure_code == null){
    			var users = {"messageCode":200, "response":"Your payment has been processed ok"};
    			response.send(users);
    		}
		}
		else if(err != null){
			console.log(err);
			var users = {"messageCode":402, "response":"Ocurred a problem with your card"};
    		response.send(users);
		}
	});
});

app.listen(port, function(){
  connectDB();
	console.log('Listening in port: '+port);
});
