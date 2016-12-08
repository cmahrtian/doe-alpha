angular.module('TeacherCtrl', [])
			.controller('TeacherController', function($scope) {
				setTimeout(function() {
					jQuery('.dropdown-button').dropdown();
				}, 0);

				d3.csv('../data/Teachers.csv', function(data) {
					// select our teacher
					var teacher = data[0];
					// edit the previous year's MOTP score and rating with teacher data
					d3.select('.previous-motp .score').text(teacher['Y16_MOTP_Value']);
					d3.select('.previous-motp .rating').text(teacher['Y16_MOTP_Rating']);
				});
			});