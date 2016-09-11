// dependencies
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var uuid = require('node-uuid');

var app = express();
app.use(bodyParser.json());
var url = 'http://' + process.env.DBFACADE_PORT_3000_TCP_ADDR + ':' + process.env.DBFACADE_PORT_3000_TCP_PORT;

//store clients in memory for this demo
var clientInfo = {
	"ff":{"name":"Test"}
};

// define supported routes
app.get('/middleware/status', function(req, res){
	res.set({
		'Content-Type': 'application/json',
	});
	res.status(200);
	var body = {
		"success":true
	};
	res.send(JSON.stringify(body));
});

app.post('/middleware/register', function(req, res) {
	//extract client name from body
	var clientName = req.body.clientName;
	
	//generate UUID as API Key
	var clientId = uuid.v4();
	clientInfo[clientId] = {
		name: clientName
	};

	//return to client
	res.status(200).json({
		success:true,
		apikey: clientId,
		clientName: clientName
	});
	

});

app.get('/middleware/somerequest', function(req, res) {

	console.log(JSON.stringify(req));
	//verify API key
	var apikey = req.query.apikey;
	var clientDetails = clientInfo[apikey];

	if(!clientDetails) {
		res.status(401).json({
			success: false,
			description: "API Client is not registered"
		});
	}
	else {
		res.status(200).json({
			success: true,
			clientName: clientDetails.name
		});
	}

});

// start node app
app.listen(3000);
console.log("Started on port 3000");
