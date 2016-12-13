angular.module('TeacherCtrl', [])
			.controller('TeacherController', function($scope) {
				setTimeout(function() {
					jQuery('.dropdown-button').dropdown();
				}, 0);

				// Test Teacher = Yoli Ann Barrett (P.S. 154)
				// Figure out alternative way how to delcare as universal variable
				var employeeID = '0955968';
				var fiscalYear = '2017';
				function teacherLookup(element) {
					return element.EmployeeID === employeeID;
				};

				d3.csv('../data/Teachers.csv', function(data) {
					// select our teacher
					var teacher = data.find(teacherLookup);
					// edit the previous year's MOTP score and rating with teacher data
					d3.select('.previous-motp .score').text(teacher['Y16_MOTP_Value']);
					d3.select('.previous-motp .rating').text(teacher['Y16_MOTP_Rating']);
				});

				d3.csv('../data/Observations.csv', function(data) {
					var teacher = data.filter(teacherLookup);
					teacher.forEach(function(element) {
						if (element.FiscalYear === fiscalYear) {
							d3.select('.observation-cards').append("div")
								.classed("col s2 completed-observation", true);
						};
					});
				});
			});