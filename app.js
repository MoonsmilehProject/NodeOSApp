
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


app.post('/api/donate/card.json', function(req, response) {
	var userdata = req.body;

	console.log('Payment received by: '+ userdata.username + " with card number: "+userdata.numberCard);

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