// Dependencies and setup

var express = require('express'),
	app = express(),
	port = Number(process.env.PORT || 8080),
    assert = require('assert')
    bodyParser = require('body-parser');

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended:true}));


// Routes
app.post('/api/login/user', function(req, res){
  var userdata = req.body;
  var response = {
   "package":[
      {
         "order_number":"34123",
         "tracking_number":"4223",
         "order_date":"2018-07-22T03:19:07.355Z",
         "client_name":"Adriana",
         "client_phone":"5509230112",
         "zone":"2",
         "type":"pagado",
         "insert_date":"2018-07-22T03:19:07.355Z",
         "company":"Best company",
         "delivery":{
            "name":"Santiago",
            "email":"jfje@gmail.com",
            "phone":"5578230112"
         },
         "track":[
            {
               "date":"2018-07-22T03:19:07.355Z",
               "status":"pendiente",
               "info":"Other info"
            },
            {
               "date":"2018-07-23T03:19:07.355Z",
               "status":"entregado",
               "info":"Other info"
            }
         ]
      }
   ]
  };
  res.send(response);
});


app.listen(port, function(){
	console.log('Listening in port: '+ port);
});
