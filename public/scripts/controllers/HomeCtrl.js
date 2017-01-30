// app.controller('HomeController', function($scope,  $http, $location) {
	
//     $scope.userLogout = function(){
//     	$http({
//     		method: 'post',
//     		url: 'logout',
//     		headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
//     	}).success(function(){
//     		$location.url('/');
//     	})
//     }


//     // enables JQuery dynamicism for dropdown menu
//     setTimeout(function() {
// 		jQuery('.dropdown-button').dropdown();
// 	}, 0);

//     // uses Employee ID established during login
    
//     // redirects to login page and clears sessionStorage when "Log Off" button
// 		// is clicked
// 		// jQuery('.log-off').click(function() {
// 		// 	sessionStorage.clear();
// 		// });

// 		// var employeeID = window.sessionStorage.getItem('employeeID');
// 		// // redirects app to Login page if user is not signed in
// 		// if (employeeID === null) {
// 		// 	window.location.replace('/');
// 		// } else {
// 		// 	d3.csv('../data/Teachers.csv', function(data) {
// 		// 		var teacher = data.find(function(element) {
// 		// 			return element.EmployeeID === employeeID
// 		// 		});
// 		// 		function titleCase(string) {
// 		// 			return string.toLowerCase().split(' ').map(function(word) {
// 		// 				return word.replace(word[0], word[0].toUpperCase());
// 		// 			}).join(' ');
// 		// 		}
// 		// 		d3.select('nav .brand-logo.right')
// 		// 			.text('Hi, ' + titleCase(teacher.FirstName));
// 		// 	});
// 		// };	
// 	});