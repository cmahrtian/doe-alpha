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
		passport.authenticate('local-login', {
			successRedirect:'/home',
			failureRedirect:'/',
			failureFlash: true
		}), function(req, res){	

			// auth.authenticateUser(req.body, function(data, err){	
			// 	if (err){
			// 		console.log('ERROR IN ROUTE');
			// 		console.log(err);
			// 	} 
			// 	// else {
			// 	// 	responseData = data;
			// 	// 	res.redirect('/home');
			// 	// }
				
			// });
		});
};