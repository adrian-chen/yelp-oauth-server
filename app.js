var express = require('express')
var app = express()
var qs = require('qs');

var yelp = require("yelp").createClient({
  consumer_key: "yxNzwWDAoy6z1nGPx3kXbw", 
  consumer_secret: "CEF7dqjstsfGkxjCpR5V5YkIiWg",
  token: "r6QzB4qoeIUyU92SuAPUCm0wMsNtEh1n",
  token_secret: "DZi7lUQK8KrPb8dYSiH5Zv1BJjE"
})
;
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "irakliz.github.io/yelp-jquery/*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
    res.send("Yelp Oauth")
})

app.get('/search/:yelp_params', function(req, res) {    
    
    console.log(qs.parse(req.params.yelp_params));
    // See http://www.yelp.com/developers/documentation/v2/search_api
    yelp.search(qs.parse(req.params.yelp_params), function(error, data) {
      res.send(data);
    });
});

app.get('/business/:yelp_params', function(req, res) {
    // See http://www.yelp.com/developers/documentation/v2/business
    yelp.business(req.params.yelp_params, function(error, data) {
        res.send(data);
    });
});

app.set('port', (process.env.PORT || 3000))

var server = app.listen(process.env.PORT || app.get('port'), function() {

    var host = server.address().address
    var port = server.address().port
    console.log('App listening at http://%s:%s', host, port)
})