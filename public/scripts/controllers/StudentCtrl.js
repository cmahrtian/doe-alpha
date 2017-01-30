angular.module('StudentCtrl', [])
	.controller('StudentController', function($scope) {
		// enables JQuery dynamicism for dropdown menu and collapsible completed
		// observation card
		setTimeout(function() {
			jQuery('.dropdown-button').dropdown();
		}, 0);
		jQuery('.collapsible').collapsible();
	});