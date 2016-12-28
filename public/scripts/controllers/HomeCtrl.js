angular.module('HomeCtrl', [])
			.controller('HomeController', function($scope) {
				// enables JQuery dynamicism for dropdown menu
        setTimeout(function() {
					jQuery('.dropdown-button').dropdown();
				}, 0);
			});