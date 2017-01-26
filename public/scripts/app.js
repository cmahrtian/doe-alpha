var app = angular.module('growthExplorer', [
	'angular-md5', 
	'ngRoute', 
	'appRoutes', 
	'HomeCtrl', 
	'LoginCtrl', 
	'TeacherCtrl'
	// 'LoginService'
]);


// app.factory('Login', function($localStorage) {
// 	$localStorage = $localStorage.$default({
// 		credentials: {
// 			email: '',
// 			employeeID: ''
// 		}
// 	});
// 	return {
// 		getCredentials: function() {
// 			return $localStorage.credentials;
// 		},
// 		setCredentials: function(email, employeeID) {
// 			$localStorage.credentials.email = email;
// 			$localStorage.credentials.employeeID = employeeID;
// 		}
// 	};
// });

// app.service('Login', function() {
// TBD login code
// 	var credentials = {
// 		email: '',
// 		employeeID: ''
// 	};
	
// 	return {
// 		getCredentials: function() {
// 			return credentials;
// 		},
// 		setCredentials: function(email, employeeID) {
// 			credentials.email = email;
// 			credentials.employeeID = employeeID;
// 		}
// 	};
// });