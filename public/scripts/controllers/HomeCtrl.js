angular.module('HomeCtrl', [])
	.controller('HomeController', function($scope, Login) {
		// enables JQuery dynamicism for dropdown menu
    setTimeout(function() {
			jQuery('.dropdown-button').dropdown();
		}, 0);
    // uses Employee ID established during login
    console.log(Login.getCredentials());
	});