angular.module('appRoutes', [])
			.config(['$routeProvider', '$locationProvider', 
				function($routeProvider, $locationProvider) {
					$routeProvider
					// login page that will use the LoginController
						.when('/', {
							templateUrl: 'views/pages/login.ejs',
							controller: 'LoginCtrl',
						})
						.when('/home', {
							templateUrl: 'views/pages/home.ejs',
							controller: 'HomeCtrl',
							resolve: {
								loggedin: checkLoggedinHome
							}
						})
						.when('/teacher-practice', {
							templateUrl: 'views/pages/teacher-practice.ejs',
							controller: 'TeachCtrl',
							resolve: {
								loggedin: checkLoggedinTeacher
							}
						})
						.otherwise({
							redirectTo: '/'
						});

					$locationProvider.html5Mode({
						enabled: true,
						requireBase: true
					});	
				}]);