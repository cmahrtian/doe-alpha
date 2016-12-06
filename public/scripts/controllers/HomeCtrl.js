angular.module('HomeCtrl', [])
			.controller('HomeController', function($scope) {
				setTimeout(function() {
					jQuery('.dropdown-button').dropdown();
				}, 0);
			});