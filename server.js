// modules ====================================================================
var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var LocalStrategy = require('passport-local').Strategy;
var methodOverride = require('method-override');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var path = require('path');
var passport = require('passport');
require('dotenv').config()

// set our port
var port = process.env.PORT || 3000;
var flash = require('connect-flash');
var app = express();

// set the view engine to ejs
app.set('views', './public/views');
app.set('view engine', 'ejs');

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

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
app.use(express.static(path.join(__dirname + '/public')));



// configuration ==============================================================

// config files
var auth = require('./config/auth')(app, passport);

// routes =====================================================================
var routes = require('./app/routes')(app, passport, auth); // configure our routes


app.use(morgan('combined'));
app.use(cookieParser());

// start app ==================================================================
// startup our app at http://localhost:3000
app.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;