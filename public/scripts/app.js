var app = angular.module('growthExplorer', [
	'angular-md5', 
	'ngRoute', 
	'HomeCtrl', 
	'LoginCtrl', 
	'TeacherCtrl',
	'ngResource',
	// 'LoginService'
]).config(function($routeProvider, $locationProvider, $httpProvider){

	var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
		var deferred = $q.defer();
		$http.get('/home').success(function(user){
			console.log('we are in /home');
			if(user !== '0'){	
				deferred.resolve();
			} else {
				$rootScope.message = 'NOT LOGGED IN';
				deferred.reject();
				$location.url('/login');
			}
		});
	
		return deferred.promise;
	};

	$httpProvider.interceptors.push(function($q, $location){
		return {
			response: function(response){
				return response;
			},
			responseError: function(response){
				if (response.status === 401){
					$location.url('/');
					return $q.reject(response);
				}
			}
		}
	});
	$routeProvider
	// login page that will use the LoginController
		.when('/', {
			templateUrl: 'views/pages/login.ejs',
			controller: 'LoginController'
		})
		.when('/home', {
		// home page
			templateUrl: 'views/pages/home.ejs',
			controller: 'HomeController',
			resolve: {
				loggedin: checkLoggedin
			}
		})
		.when('/teacher-practice', {
			templateUrl: 'views/pages/teacher-practice.ejs',
			controller: 'TeacherController'
		})
		.otherwise({
			redirectTo: '/'
		})
	
})

.run(function($rootScope, $http){
	$rootScope.message = '';
	$rootScope.logout = function(){
		$rootScope.message = 'Logged out';
		$http.post('/logout');
	}
})


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