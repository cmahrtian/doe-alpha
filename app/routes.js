module.exports = function(app, passport) {
		// frontend routes ==========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		// load our public/index.ejs file
		res.render('index');
	});

	// server routes ============================================================
	app.post('/login', 
		passport.authenticate('local-login', {
			successRedirect:'/home', 
			failureRedirect:'/', 
			failureFlash: true
		}), function(req, res){	
			console.log('LOGGING IN');
			if (req.body.remember){
				console.log('REMEMBER');
				req.session.cookie.maxAge = 1000*60*3;
			} else {
				console.log('DO NOT REMEMBER');
				req.session.cookie.expires = false;
			}
		});

	app.get('/logout', function(req,res){
		console.log('logging out');
		req.logout();
		res.redirect('/');
	})

};