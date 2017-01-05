var app = angular.module('growthExplorer', ['ngRoute', 'ngStorage', 'appRoutes', 'HomeCtrl', 'LoginCtrl', 'TeacherCtrl', 'LoginService']);

app.service('Login', function() {
	// TBD login code
	var credentials = {
		email: '',
		employeeID: ''
	};
	
	return {
		setCredentials: function(email, employeeID) {
			credentials.email = email;
			credentials.employeeID = employeeID;
		},
		getCredentials: function() {
			return credentials;
		}
	};
});