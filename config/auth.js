module.exports = function(app, passport) {

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

	// open up a connection as part of auth flow
	pool.getConnection(function(err, connection){
		// check if the connection is open
		if (err) {
			 console.log('not connected');
		} else {
			console.log('connected to DB');
		}	

		// method to authenticate user in DB to be exposed to the app
		exports.authenticateUser = function(request, callback){

			console.log('AUTH FLOW');

			// serialize and de-serialize user
			passport.serializeUser(function(user, done){
				done(null, user.id);
			});

			passport.deserializeUser(function(id, done){
				connection.query(process.env.SERIALIZE_QUERY + id, function(err, rows){
					done(err, rows[0]);
				});
			})

			// define local login strategy
			passport.use('local-login', new LocalStrategy({
					usernameField: 'email',
					passwordField: 'password',
					passReqToCallback: true
				}, function(request, username, password, done){

					console.log('WE ARE INSIDE PASSPORT LOCAL STRATEGY');

					console.log('THIS IS THE REQ PASSED TO PASSPORT =>' + request);

					var preparedQuery = process.env.LOGIN_QUERY;
					// query from our correction pool
					connection.query(preparedQuery + "'"+ request.email +"'" + ";", function(err, rows, done){
						if(err){
							console.log('error in DB QUERY');	
							console.log(err);			
						} if (!rows.length){
							console.log('NO USER FOUND');
						} if (!(rows[0].email == email)){
							return done(null, false, req.flash('loginMessage', 'WRONG PASSWORD'));
						}
						// pass results to callback
						// else {
						// 	callback(rows[0]);
						// }
					});
				}
			));			

		
		}
	});
}