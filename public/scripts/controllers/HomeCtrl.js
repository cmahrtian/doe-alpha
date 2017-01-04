angular.module('HomeCtrl', [])
	.controller('HomeController', function($scope, $sessionStorage) {
		// enables JQuery dynamicism for dropdown menu
    setTimeout(function() {
			jQuery('.dropdown-button').dropdown();
		}, 0);
    $scope.$storage.employeeID = $sessionStorage.employeeID;
    console.log($sessionStorage.employeeID);
	});