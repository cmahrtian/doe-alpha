module.exports = function(app, passport) {
	app.get('/', function(req, res){
		res.render('index');
	});

	app.get('/home', function(req, res){
		console.log(req.body);
		console.log(req.isAuthenticated());
		res.send(req.isAuthenticated() ? req.user : '0');
	});

	// server routes ============================================================
	app.post('/login', passport.authenticate('local-login'), function(req, res){
		res.send(req.user);
	});

	app.post('/logout', function(req,res){
		req.logOut();
		res.send(200);
	})
};


		// frontend routes ==========================================================
	// route to handle all angular requests
	// app.get('*', function(req, res) {
	// 	// load our public/index.ejs file
	// 	res.render('index');
	// });
