angular.module('appRoutes', [])
			.config(['$routeProvider', '$locationProvider', 
				function($routeProvider, $locationProvider) {
					$routeProvider
					// home page
						.when('/', {
							templateUrl: 'index.html',
							controller: 'IndexController'
						})
					// login page that will use the LoginController
						.when('/login', {
							templateUrl: 'views/login.html',
							controller: 'LoginController'
						});
					$locationProvider.html5Mode(true);		
				}]);