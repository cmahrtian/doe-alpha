// modules ====================================================================
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
var port = process.env.PORT || 3000;

var methodOverride = require('method-override');
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');

require('dotenv').config()
require('./config/auth')(passport);

// set the view engine to ejs
app.set('views', './public/views');
app.set('view engine', 'ejs');

app.use(session({
	secret:process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true
}));

// set the static files location; e.g. "/public/img" will be "/img" for users
app.use(express.static(path.join(__dirname + '/public')));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.urlencoded({
	extended: true
}));



// // parse application/vnd.api+json as json
// app.use(bodyParser.json({
// 	type: 'application/vnd.api+json'
// }));

// // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));



app.use(morgan('dev'));
app.use(cookieParser());
// routes =====================================================================
require('./app/server-routes')(app, passport); // configure server-side routes


// start app ==================================================================
app.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);
