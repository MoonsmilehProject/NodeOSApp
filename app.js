
// Dependencies and setup

var express = require('express'),
	app = express(),
	MongoClient = require('mongodb').MongoClient,
	port = Number(process.env.PORT || 8080),
    assert = require('assert');

var conekta = require('conekta');

// Routes
app.get('api/profile', function(req, res) {

console.log('Ewe, acercate más we');
/*
    MongoClient.connect('mongodb://localhost:27017/chatiw', function(err,db){
        assert.equal(null, err);
        console.log("Successfully connected to mongoDB");
        db.collection('users').find({}).toArray(function(err,docs){
            console.log(docs);  
            var users = {"users":docs,"messageCode":200, "response":"User list found, u're welcome"};
            res.send(users);

        });
    });

    */
	
	var usersObject = {"users":[{"name":"Aldair Guillermo Avalos Sanchéz", "idUser":"al102@gmail.com"},
								   {"name":"Ximena Flores Acevedo", "idUser":"xla10@gmail.com"},
								   {"name":"Andrea López Silva", "idUser":"andyLove@gmail.com"},
								   {"name":"Amairani Perez Casas"}], "messageCode":200, "response":"User list found, u're welcome"};
	;
});


app.post('/', function(req,res) {
	console.log('JSON Received: '+req.body);

	conekta.api_key = "key_gwFSd2HtH6AAS7V6h1LaHA";
	conekta.Charge.create({
  "description":"Stogies",
  "amount": 20000,
  "currency":"MXN",
  "reference_id":"9839-wolf_pack",
  "card": "tok_test_visa_4242",
  "details": {
    "name": "Humberto Solano",
    "phone": "403-342-0642",
    "email": "moonsmileh.project@gmail.com",
    "customer": {
      "logged_in": true,
      "successful_purchases": 14,
      "created_at": 1379784950,
      "updated_at": 1379784950,
      "offline_payments": 4,
      "score": 9
    },
    "line_items": [{
      "name": "Box of Cohiba S1s",
      "description": "Imported From Mex.",
      "unit_price": 20000,
      "quantity": 1,
      "sku": "cohb_s1",
      "category": "food"
    }],
    "billing_address": {
      "street1":"77 Mystery Lane",
      "street2": "Suite 124",
      "street3": null,
      "city": "Darlington",
      "state":"NJ",
      "zip": "10192",
      "country": "Mexico",
      "tax_id": "xmn671212drx",
      "company_name":"X-Men Inc.",
      "phone": "77-777-7777",
      "email": "moonsmileh.project@gmail.com"
    }
  }
}, function(err, res) {
    console.log(res.toObject());
});
	/*
	conekta.Charge.create({
		"description":"Donation general public",
		"amount": 1000,
		"currency":"MXN",
		"reference_id":"2697-Moonsmileh",
		"card":"tok_test_visa_4242",
		"monthly_installments": 3,
		"details": {
			"name":"Humberto Solano",
			"phone":"5585810642",
			"email":"moonsmileh.project@gmail.com",
			"customer":{
				"logged_in": true,
				"succesful_purchase":1,
				"created_at":1379784950,
				"updated_at":1379784950,
				"offñine_payments":0,
				"score":9
			},
			"line_items":[{
				"name":"Donativo Olimpiadas Especiales",
				"description":"Donativo voluntario a Olimpiadas Especiales A.C.",
				"unit_price": 1000,
				"quantity":1,
				"sku":"sku_os_0001",
				"category":"Social"
			}],
			"billing_addres":{
				"street1":"Hacienda Vista Hermosa",
				"street2":null,
				"street3":null,
				"city":"CDMX",
				"state":"DF",
				"zip":"00480",
				"country":"Mexico",
				"tax_id":"xmn671212drx",
				"company_name":"Olimpiadas Especiales AC",
				"phone":"55717028",
				"email":"OS"
			}
		}
	}, function(err,res){
		console.log(res);
	});
	*/
});

app.listen(port, function(){
	console.log('Listening in port: '+port);
});