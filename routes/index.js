var express = require('express');
var router = express.Router();
var api = require('../api');
var client = api.client;
var multi = client.multi();
var validateArray = api.validate;
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'BookmyShow - Assignment' });
});


router.post('/', function(req, res){
	var userArray = req.body.userInput;
	if(typeof userArray === 'undefined'){
		res.render('index', 
					{
						title : 'Error',
						flashMessage : 'An error occurred while processing you request. Please try again', 
						type: 'error'
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
							type: 'success'
						}
					);
			client.get('userArray', function(err, reply) {
			    console.log(reply);
			})
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
