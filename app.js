var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 300000 } }, 
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 300000 } }
};
var timeout = require('connect-timeout'); //express v4
var dbURI = "mongodb://23.97.102.250:27017/Wallke";
var port = process.env.PORT || 9091;

var routes = require('./routes/index');
var places = require('./routes/places');
var photos = require('./routes/photos');
var categories = require('./routes/categories');

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


app.use(timeout('100s'));
app.use(bodyParser());
app.use(routes);
app.use(places);
app.use(photos);
app.use(categories);

mongoose.connect(dbURI, options);


app.listen(port);
console.log('Magic happens on port ' + port);

