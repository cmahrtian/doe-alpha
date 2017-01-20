// modules ====================================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var ejs = require('ejs');
var methodOverride = require('method-override');

// configuration ==============================================================

// config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 3000;

// connect to MySQL database
// uncomment after entering in credentials in config/db.js
// sequelize.connect(db.url) ???

// set the view engine to ejs
app.set('views', './public/views');
app.set('view engine', 'ejs');

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({
	type: 'application/vnd.api+json'
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: true
}));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location; e.g. "/public/img" will be "/img" for users
app.use(express.static(__dirname + '/public'));

// routes =====================================================================
require('./app/routes')(app); // configure our routes

// start app ==================================================================
// startup our app at http://localhost:3000
app.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;