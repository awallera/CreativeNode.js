var express = require('express');
var router = express.Router();
var fs = require('fs');
var http = require('http')
var request = require('request');

/* GET home page. */
router.get('/', function(req, res) {
res.sendFile('Try2.html', { root:  'public' });  
});

router.get('/getQuote',function(req,res) {

var myRe = req.query.q;
          console.log(myRe);

var url = "http://finance.google.com/finance/info?client=ig&q=NASDAQ:"+myRe;
request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    	console.log(body[1]);
	console.log(body["query"]);
	console.log(body["results"]);
	console.log(body["query"]);



	res.status(200).json(body);
  }
})
});



router.get('/getSymbol',function(req,res,next) {
console.log(req);
console.log("N");
console.log(req.query);
var myRe = new RegExp("^" + req.query.q);
          console.log(myRe);


fs.readFile(__dirname + '/cities.dat.txt',function(err,data) {
            if(err) throw err;
            var symbols = data.toString().split("\n");


        var jsonresult = [];
        for(var i = 0; i < symbols.length; i++) {
          var result = symbols[i].search(myRe); 
          if(result != -1) {
           console.log(symbols[i]);
           jsonresult.push({symbol:symbols[i]});
          } 
        }   
        console.log(jsonresult);

	res.status(200).json(jsonresult);
          
});});


module.exports = router;
