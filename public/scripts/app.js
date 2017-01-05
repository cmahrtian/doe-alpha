var app = angular.module('growthExplorer', ['ngRoute', 'ngStorage', 'appRoutes', 'HomeCtrl', 'LoginCtrl', 'TeacherCtrl', 'LoginService']);

app.service('Login', function() {
	// TBD login code
	var credentials = {
		email: '',
		employeeID: ''
	};
	
	return {
		getCredentials: function() {
			return credentials;
		},
		setCredentials: function(email, employeeID) {
			credentials.email = email;
			credentials.employeeID = employeeID;
		}
	};
});