module.exports = function(app, passport) {

	app.get('/', function(req, res){
		res.render('index');
	});

	// two routes with auth 

	app.get('/home', function(req, res){
		res.send(req.isAuthenticated() ? req.user : '0');
	});

	app.get('/teacher-practice', function(req, res){
		console.log(req.isAuthenticated());
		res.send(req.isAuthenticated() ? req.user : '0');
	});
	

	// server routes ============================================================
	

	// authenticate
	app.post('/login', passport.authenticate('local-login'), function(req, res){
		res.send(req.user);
	});

	// log out
	app.post('/logout', function(req,res){
		req.logOut();
		res.sendStatus(200);
	})
};


		// frontend routes ==========================================================
	// route to handle all angular requests
	// app.get('*', function(req, res) {
	// 	// load our public/index.ejs file
	// 	res.render('index');
	// });
