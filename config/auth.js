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

	// open up a connection as part of auth flow
	pool.getConnection(function(err, connection){
		// check if the connection is open
		if (err) {
			 console.log('not connected');
		} else {
			console.log('connected to DB');
		}

		// serialize and de-serialize user
		passport.serializeUser(function(user, done){
			done(null, user);
			console.log('USER SERIALIZED');
		});
		passport.deserializeUser(function(user, done){
			done(null, user);
			console.log('USER DE-SERIALIZED');
		})

		// define local login strategy
		passport.use('local-login', 
			new LocalStrategy({
				usernameField: 'email',
				passwordField: 'password',
				passReqToCallback: true
			}, 
			function(req, username, password, done){
				var preparedQuery = process.env.LOGIN_QUERY;
				// query from our connection pool, return user if exists
				connection.query(preparedQuery + connection.escape(username), function(err, rows){
					if(err){
						return done(err);			
					} if (!rows.length){
						console.log('NO USER FOUND');
						return done(null, false );
					} if (username !== rows[0].Email){
						console.log('WRONG PASSWORD')
						return done(null, false);
					} else {
						console.log('RIGHT USER')
						// return user object
						var user = { id: rows[0].EmployeeID, username: rows[0].Email }
						return done(null, user);
					}					
				});
			}
		));			
	});
}

