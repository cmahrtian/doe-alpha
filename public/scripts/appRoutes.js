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
					controller: 'HomeController'
				})
				// teacher practice page
				.when('/teacher-practice', {
					templateUrl: 'views/pages/teacher-practice.ejs',
					controller: 'TeacherController'
				})
				// components page
				.when('/teacher-practice/components', {
					templateUrl: 'views/pages/components.ejs',
					controller: 'TeacherController'
				});
			$locationProvider.html5Mode({
				enabled: true,
				requireBase: false
			});		
		}]);