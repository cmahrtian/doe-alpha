angular.module('LoginCtrl', [])
	.controller('LoginController', function($scope) {
		jQuery('a.logon').click(function() {
			var email = jQuery('#email').val();
			var password = jQuery('#password').val();
			d3.csv('../data/Teachers.csv', function(data) {
				var emailAddresses = data.map(function(teacher) {
					return teacher.Email;
				});
				var employeeIDs = data.map(function(teacher) {
					return teacher.EmployeeID;
				});
				if (emailAddresses.includes(email) && employeeIDs.includes(password)) {
					window.location.replace('/home');
				} else {
					alert('Invalid email address and/or user ID');
				};
			});
		});
	});