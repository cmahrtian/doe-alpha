// grab the Teacher model
var Teacher = require('./models/teacher');

module.exports = function(app) {
	// server routes ============================================================
	// handle things like API calls, authentication routes

	// sample API route
	app.get('/api/teachers', function(req, res) {
		// use sequelize to get all teachers in the database
		Teacher.find(function(err, teachers) {
			// if there is an error retrieving, send the error
			// nothing after res.send(err) will execute
			if (err)
				res.send(err);
			res.json(teachers); // return all teachers in JSON format
		});
	});

	// frontend routes ==========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		// load our public/index.html file
		res.render('index');
	});
};