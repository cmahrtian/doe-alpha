// grab the Teacher model
var Teacher = require('./models/teacher');

var db = require('../config/db');
// config for MYSQL 

module.exports = function(app, passport) {
	// server routes ============================================================
	// handle things like API calls, authentication routes

	// frontend routes ==========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		// load our public/index.ejs file
		res.render('index');
	});

	app.post('/login', function(req, res){		
		db.getUser(req, function(res, er, done){	
			if (err){
				console.log('there is an error -- route');
			} else {
				res.send('sent req')
			}
			// res.send (results);
			
		});
	});
};