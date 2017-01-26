module.exports = function(app, passport) {
		// frontend routes ==========================================================
	// route to handle all angular requests
	// app.get('*', function(req, res) {
	// 	// load our public/index.ejs file
	// 	res.render('index');
	// });


	app.get('/', function(req, res){
		res.render('index');
	});

	app.get('/home', function(req, res){
		console.log(req.body);
		console.log(req.isAuthenticated());
		res.send(req.isAuthenticated() ? req.user : '0');
	});

	// server routes ============================================================
	app.post('/login', 
		passport.authenticate('local-login', {
			successRedirect:'/home', 
			failureRedirect:'/', 
			failureFlash: true
		}), function(req, res){	
			console.log('LOGGING IN');
			console.log('THIS IS REQ.USER =>' + req.user);
			if (req.body.remember){
				req.session.cookie.maxAge = 1000*60*3;
			} else {
				req.session.cookie.expires = false;
			}
			res.send(req.user);
		});

	app.post('/logout', function(req,res){
		console.log('logging out');
		req.logOut();
		res.send(200);
	})

};