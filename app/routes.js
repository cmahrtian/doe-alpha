// grab the Teacher model
var Teacher = require('./models/teacher');

module.exports = function(app, passport) {
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
	// app.get('*', function(req, res) {
	// 	// load our public/index.ejs file
	// 	res.render('index');
	// });
	app.get('/', function(req, res){
		res.render('index');
	});
	app.post('/login', function(req, res){
		// auth happens here ---
		// req.body provides the params for the auth flow
		//console.log(req.body);
		res.send('login attempted');
		//res.render('/pages/home');
	})

};