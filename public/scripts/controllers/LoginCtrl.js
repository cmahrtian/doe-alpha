angular.module('LoginCtrl', [])
	.controller('LoginController', function($scope, Login, $http, md5, $location) {
		// determines ability to log in after clicking "Log In" button
		$scope.reqParams = {};
		$scope.userlogin = function(){			
			$http({
				method:'post',
				url:'/login',
				data: $.param($scope.reqParams),
				headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).success(function(response){
				console.log('success');
				//$location.path('/home');
			}).error(function(response){
				console.log('error');
				console.log(response);
			})
		}
		

		// jQuery('a.logon').click(function() {
		// 	// input values in Email and EmployeeID fields, respectively
		// 	var email = jQuery('#email').val();
		// 	var password = jQuery('#password').val();
		// 	d3.csv('../data/Teachers.csv', function(data) {
		// 		// searches dataset for teacher whose email and EmployeeID match the
		// 		// input values
		// 		function matchingCredentials(element) {
		// 			return element.Email.toUpperCase() === email.toUpperCase() && element.EmployeeID === password;
		// 		};
		// 		// proceeds to home page if credentials are a match, saves the 
		// 		// EmployeeID as a session variable (at least it should)

		// 		if (data.some(matchingCredentials)) {
		// 			window.sessionStorage.setItem('employeeID', password);
		// 			// $scope.credentials = Login.getCredentials();
		// 			// Login.setCredentials(email, password);
		// 			// console.log($localStorage);
		// 			window.location.replace('/home');
		// 		// flashes error message if credentials are not a match
		// 		} else {
		// 			alert('Invalid email address and/or user ID');
		// 		};
		// 	});
		// });
	});