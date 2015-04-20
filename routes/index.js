var express = require('express');
var router = express.Router();
var api = require('../api');
var client = api.client;
var multi = client.multi();
var validateArray = api.validate;


var getStoredArray = function(callback){
	var arr;
	client.get('userArray', function(err, reply) {
	    arr = reply;
	    callback(arr);
	});
}


/* GET home page. */
router.get('/', function(req, res, next) {
	var temp = getStoredArray(function(result){
		return result;
	});
	console.log(temp);
	res.render('index', { title: 'BookmyShow - Assignment', storedArray : getStoredArray(function(result){return result;}) });
});

router.post('/', function(req, res){
	var userArray = req.body.userInput;
	var storedArray = getStoredArray;
	if(typeof userArray === 'undefined'){
		res.render('index', 
					{
						title : 'Error',
						flashMessage : 'An error occurred while processing you request. Please try again', 
						type: 'error',
						storedArray : getStoredArray() || 'asd'
					}	
				);
	}
	else{
		var arr = userArray.split(',');
		if(validateArray(arr)){
	    	client.set('userArray', arr);
			res.render('index', 
						{	
							title : 'Success', 
							flashMessage : 'Succesful Submission', 
							type: 'success',
							storedArray : getStoredArray()
						}
					);
			client.get('userArray', function(err, reply) {
			    console.log(reply);
			});
		}
		else{
			res.render('index', 
						{	
							title : 'Error', 
							flashMessage : 'Invalid Submission', 
							type: 'error'
						}
					);
			}
	}
});

module.exports = router;
