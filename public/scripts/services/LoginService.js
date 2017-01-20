angular.module('LoginService', [])
			.factory('Login', ['$http', function($http) {
				return {
					// call to get all logins
					get : function() {
						return $http.get('/api/login');
					},
					// these will work when more API routes are defined in Node
					// call to POST and create a new login
					create : function(loginData) {
						return $http.post('/api/login', loginData);
					},
					// call to DELETE a login
					delete : function(id) {
						return $http.delete('/api/login' + id);
					}
				}
			}]);