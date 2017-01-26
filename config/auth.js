var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');

// config for MYSQL
// create a pool of connections  
var pool = mysql.createPool({
		host: process.env.SERVER,
		user: process.env.DEVELOPMENT_ID,
		password: process.env.DEVELOPMENT_SECRET,
		database: process.env.DB_ID,
		connectionLimit: 10 
	});

module.exports = function(passport){
	// serialize and de-serialize user
	passport.serializeUser(function(user, done){
		done(null, user.EmployeeID);
		console.log('THIS IS USER => ' + user);
		console.log('USER SERIALIZED');
	});
	passport.deserializeUser(function(EmployeeID, done){
		connection.query(process.env.SERIALIZE_QUERY + connection.escape(EmployeeID), function(err, rows){
			done(err, rows[0]);
		});
		console.log('USER DE-SERIALIZED');
	})
	// open up a connection 
	pool.getConnection(function(err, connection){
		// check if the connection is open
		if (err) {
			 console.log('not connected');
		} else {
			console.log('connected to DB');
		}	
		// define local login strategy
		passport.use('local-login', 
			new LocalStrategy({
				usernameField: 'username',
				passwordField: 'password',
				passReqToCallback: true
			}, 
			function(req, username, password, done){
				var preparedQuery = process.env.LOGIN_QUERY;
				// query from our connection pool and authenticate return
				connection.query(preparedQuery + connection.escape(username), function(err, rows){
					if(err){
						console.log('error in DB QUERY');	
						return done(err);			
					} if (!rows.length){
						console.log('NO USER FOUND');
						return done(null, false, req.flash('loginMessage', 'NO USER FOUND') );
					} if (username !== rows[0].Email){
						console.log('WRONG PASSWORD')
						return done(null, false, req.flash('loginMessage', 'WRONG user'));
					} else {
						console.log('RIGHT USER')
						return done(null, rows[0]);
					}					
				});
			}
		));			
	});
}

