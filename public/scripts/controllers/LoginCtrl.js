angular.module('LoginCtrl', [])
	.controller('LoginController', function($scope, Login) {
		// determines ability to log in after clicking "Log In" button
		jQuery('a.logon').click(function() {
			// input values in Email and EmployeeID fields, respectively
			var email = jQuery('#email').val();
			var password = jQuery('#password').val();
			d3.csv('../data/Teachers.csv', function(data) {
				// searches dataset for teacher whose email and EmployeeID match the
				// input values
				function matchingCredentials(element) {
					return element.Email === email && element.EmployeeID === password;
				};
				// proceeds to home page if credentials are a match, saves the 
				// EmployeeID as a session variable (at least it should)
				if (data.some(matchingCredentials)) {
					Login.setCredentials(email, password);
					window.location.replace('/home');
				// flashes error message if credentials are not a match
				} else {
					alert('Invalid email address and/or user ID');
				};
			});
		});
	});