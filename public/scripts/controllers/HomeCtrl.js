angular.module('HomeCtrl', [])
	.controller('HomeController', ['$scope', 'Login', function($scope, Login) {
		// enables JQuery dynamicism for dropdown menu
    setTimeout(function() {
			jQuery('.dropdown-button').dropdown();
		}, 0);
    // uses Employee ID established during login
    var employeeID = window.localStorage.getItem('employeeID');
    console.log(employeeID);
	}]);