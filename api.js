app = require('./app').app;
var session = require('express-session')
var RedisStore = require('connect-redis')(session);
var redis = require('redis');
var client = redis.createClient();

app.use(session({ 
  store: new RedisStore({host : 'localhost', port : 6379, prefix : 'bms', client : client}), 
  secret : 'bms',
  proxy: true,
  resave: true,
  saveUninitialized: true 
}));

client.on('error', function(err){
  console.log("error: "+err);
});

function validateUserInput(array){
	arr = array.sort();
	for (var i = 0; i < arr.length - 1; i++) {
	    if (arr[i + 1] == arr[i]) {
	        return false; //return false if duplicate value is found
	    }
	}
	return true; // else return true 
}

exports.validate = validateUserInput;
exports.client = client;