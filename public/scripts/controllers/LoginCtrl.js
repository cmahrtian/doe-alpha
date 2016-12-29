angular.module('LoginCtrl', [])
	.controller('LoginController', function($scope) {
		// determines ability to log in after clicking "Log In" button
		jQuery('a.logon').click(function() {
			// input values in Email and EmployeeID fields, respectively
			var email = jQuery('#email').val();
			var password = jQuery('#password').val();
			d3.csv('../data/Teachers.csv', function(data) {
				// saves teacher email address and employee IDs to respective arrays
				var emailAddresses = data.map(function(teacher) {
					return teacher.Email;
				});
				var employeeIDs = data.map(function(teacher) {
					return teacher.EmployeeID;
				});
				// scans arrays for email address and employee ID input values,
				// permits access to home page if arrays include input values
				if (emailAddresses.includes(email) && employeeIDs.includes(password)) {
					window.location.replace('/home');
				} else {
					alert('Invalid email address and/or user ID');
				};
			});
		});
	});