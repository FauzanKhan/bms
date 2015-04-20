var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BookmyShow - Assignment' });
});

router.post('/', function(req, res){
	var arr = req.body.userInput;
	console.log(arr);
	res.render('index', {title : 'Post Complete'});
});

module.exports = router;
