angular.module('HomeCtrl', [])
	.controller('HomeController', ['$scope', 'Login', function($scope, Login) {
		// enables JQuery dynamicism for dropdown menu
    setTimeout(function() {
			jQuery('.dropdown-button').dropdown();
		}, 0);
    // uses Employee ID established during login
    
    // redirects to login page and clears sessionStorage when "Log Off" button
		// is clicked
		jQuery('.log-off').click(function() {
			sessionStorage.clear();
		})
	}]);