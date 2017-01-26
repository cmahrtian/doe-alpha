angular.module('appRoutes', [])
			.config(['$routeProvider', '$locationProvider', 
				function($routeProvider, $locationProvider) {
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
					$locationProvider.html5Mode({
						enabled: true,
						requireBase: true
					});		
				}]);