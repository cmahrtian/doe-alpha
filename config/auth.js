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
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		connection.query(process.env.SERIALIZE_QUERY + id, function(err, rows){
			done(err, rows[0]);
		});
	})


	// open up a connection as part of auth flow
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
					usernameField: 'email',
					passwordField: 'password',
					passReqToCallback: true
				}, 
				function(req, username, password, done){
					var preparedQuery = process.env.LOGIN_QUERY;

					// query from our connection pool
					connection.query(preparedQuery + "'"+ username +"'" + ";", function(err, rows){
						if(err){
							console.log('error in DB QUERY');	
							return done(err);			
						} if (!rows.length){
							return done(null, false, req.flash('loginMessage', 'NO USER FOUND') );
						} if (!bcrypt.compareSync(username, rows[0].email)){
							return done(null, false, req.flash('loginMessage', 'WRONG PASSWORD'));
						}
						return done(null, rows[0]);
						// pass results to callback
						// else {
						// 	callback(rows[0]);
						// }
					});
				}
			));			
	});
}

