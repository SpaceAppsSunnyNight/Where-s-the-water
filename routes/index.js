var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	if(req.query.app)
		res.render('index',{js:req.query.app+".js", id:Number(req.query.app)+1});
	else
		res.render('index',{js:"apps.js", id:1});
});

module.exports = router;
