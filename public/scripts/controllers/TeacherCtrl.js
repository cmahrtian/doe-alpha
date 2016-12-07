angular.module('TeacherCtrl', [])
			.controller('TeacherController', function($scope) {
				setTimeout(function() {
					jQuery('.dropdown-button').dropdown();
				}, 0);
			});