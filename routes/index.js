var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/task', function(req,res,next){
	res.send("Hello World")
});

router.post('/task', function(req, res, next){
	res.json([hello,world,how,are])
});

module.exports = router;
