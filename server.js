// modules ====================================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejs = require('ejs');
var passport = require('passport');
var methodOverride = require('method-override');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');


require('dotenv').config()

// configuration ==============================================================

// config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 3000;

var passport = require('passport');
var flash = require('connect-flash');

// connect to MySQL database
// uncomment after entering in credentials in config/db.js
// sequelize.connect(db.url) ???

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
app.use(express.static(__dirname + '/public'));

// routes =====================================================================
require('./app/routes')(app); // configure our routes

app.use(morgan('combined'));
app.use(cookieParser());

// local auth config
var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var sql = require('mssql');

//config for SQL Server connection
var config = {
	user: process.env.DEVELOPMENT_ID,
	password: process.env.DEVELOPMENT_SECRET,
	server: process.env.SERVER,
	database: process.env.DB_ID
}

// Establish connection to MS SQL DB

sql.connect(config, function(error){
	if(error){
		console.log('We are not connected to MSSQL DB :/');
		//throw error;
	} else {
		console.log('connected to MSSQL DB');
	}
})


// make a request to MS SQL
var request = new sql.Request([config]);

passport.serializeUser(function(username, done){
	done(null, username.userId);
});

passport.deserializeUser(function(userId, done){
	request.query("select * from tblusers where userId='"+userId+"'",function(err,rows){
		done(err, rows[0]);
	})
});


// configure local strategy with request to server

passport.use('local-login', new LocalStrategy({
		userNameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	}, 
	function(req, username, password, done){
		request.query("select * from tblusers where username ='"+username+"'", function(err, rows){
			if (err){
				return done(err);
			} if (!rows.length){
				return done(null, false, req.flash('loginMessage', 'No User Found'));
			}
			if (!( rows[0].password == password)){
	            return done(null, false, req.flash('loginMessage', 'Wrong pass')); // create the loginMessage and save it to session as flashdata
			} else {
		        // all is well, return successful user
		        return done(null, rows[0]);
		        console.log('logged in');
	    	}	
		});
	}

));




// start app ==================================================================
// startup our app at http://localhost:3000
app.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;




