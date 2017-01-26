module.exports = function(app, passport) {
		// frontend routes ==========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		// load our public/index.ejs file
		res.render('index');
	});

	// server routes ============================================================
	// handle things like API calls, authentication routes
	app.post('/login', 
		passport.authenticate('local-login', { failureRedirect:'/' }), 
		function(req, res){	
			console.log(req.body);
			res.redirect('/home');
		});
};