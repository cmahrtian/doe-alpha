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

		// Previous Year's MOTP Score and Rating
		d3.csv('../data/Teachers.csv', function(data) {
			// select our teacher
			var teacher = data.find(teacherLookup);
			// edit the previous year's MOTP score and rating with teacher data
			d3.select('.previous-motp .score').text(teacher['Y16_MOTP_Value']);
			d3.select('.previous-motp .rating').text(teacher['Y16_MOTP_Rating']);
		});

		// Current fiscal year's observations (completed and pending)
		d3.csv('../data/Observations.csv', function(data) {
			// returns array of all observations for teacher since FY 2014
			var teacher = data.filter(teacherLookup);
			teacher.forEach(function(element) {
				count = 0;
				if (element.FiscalYear === fiscalYear) {
					count++;
					// appends completed observation element to page for every 
					// observation completed thus far in current fiscal year
					var observation = d3.select('.completed-observations')
															.append('div')
															.classed('col s2 completed-observation', true);
					observation.append('h5').text(element.MOTPMonth +' '+ element.MOTPDay);

					// appends pending observation element to page for every 
					// observation expected in rest of current fiscal year
					for (var i = 0; i < element.expected_obs - count; i++) {
						d3.select('.pending-observations').append('div')
							.classed('col s2 pending-observation', true);
					};
				};
			});
		});
	});