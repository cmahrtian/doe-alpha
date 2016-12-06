angular.module('appRoutes', [])
			.config(['$routeProvider', '$locationProvider', 
				function($routeProvider, $locationProvider) {
					$routeProvider
					// login page that will use the LoginController
						.when('/', {
							templateUrl: 'views/login.html',
							controller: 'LoginController'
						})
						.when('/home', {
					// home page
							templateUrl: 'views/home.html',
							controller: 'HomeController'
						});
					$locationProvider.html5Mode(true);		
				}]);