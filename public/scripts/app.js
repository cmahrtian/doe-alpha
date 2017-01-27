var app = angular.module('growthExplorer', [
	'angular-md5', 
	'ngRoute', 
	'ngResource',
]).config(function($routeProvider, $locationProvider, $httpProvider){

	var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
		var deferred = $q.defer();
		$http.get('/home').success(function(user){
			if(user !== '0'){	
				deferred.resolve();
			} else {
				$rootScope.message = 'NOT LOGGED IN, CANNOT PROCEED';
				//deferred.reject();
				$location.url('/');
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
				} else if (response.status === 400){
					$location.url('/');
					return $q.reject(response);
				}
			}
		}
	});
	$routeProvider
		.when('/', {
			templateUrl: 'views/pages/login.ejs',
			controller: 'LoginCtrl',
		})
		.when('/home', {
			templateUrl: 'views/pages/home.ejs',
			controller: 'HomeCtrl',
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
		});

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: true
	});

})

.run(function($rootScope, $http){
	$rootScope.message = '';
	$rootScope.logout = function(){
		$rootScope.message = 'Logged out';
		$http.post('/logout');
	}
})

app.controller('LoginCtrl', function($scope, $rootScope, $http, $location){
	$scope.user = {};
	$scope.userlogin = function(){			
		$http.post('/login', {	
			username: $scope.user.username,
			password: $scope.user.password,
		}).success(function(response){
			console.log('SUCCESS ');
			$rootScope.message = 'AUTH WORKS';
			$location.url('/home');
		}).error(function(response){
			$rootScope.message = 'AUTH FAILED';
			$location.url('/');
		})
	}
})


app.controller('HomeCtrl', function($scope, $rootScope, $http, $location){
	  $scope.userLogout = function(){
    	$http({
    		method: 'post',
    		url: 'logout',
    		headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    	})
    }

})
