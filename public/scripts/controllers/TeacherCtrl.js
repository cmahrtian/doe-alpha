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
			var count = 0;
			var currentYearComponents = [];
			var currentYearMOTPIDs = [];
			
			teacher.forEach(function(element) {
				if (element.FiscalYear === fiscalYear) {	
					currentYearComponents.push(element);
				};
				if ((element.FiscalYear === fiscalYear) && (!currentYearMOTPIDs.includes(element.MOTPID))) {	
					currentYearMOTPIDs.push(element.MOTPID);
				};
			});
			
			currentYearMOTPIDs.forEach(function(element) {
				count++;
				// appends completed observation element to page for every 
				// observation completed thus far in current fiscal year
				var completedObservation = d3.select('.completed-observations')
																		.append('div')
																		.classed('col s2 completed-observation', true);
				function findObservation(entry) {
					return (entry.MOTPID === element) && (entry.Rating > 0);
				};
				var observation = currentYearComponents.find(findObservation);
				completedObservation.append('h5')
														.text(observation.MOTPMonth +' '+ observation.MOTPDay)
				var observationComponents = currentYearComponents.filter(findObservation);
				var sumProduct = 0;
				var sumOfWeights = 0;
				observationComponents.forEach(function(entry) {
					sumProduct += (entry.Rating * entry.MOTPComponentWeight);
					sumOfWeights += parseFloat(entry.MOTPComponentWeight);
				});
				completedObservation.append('p')
														.classed('score', true)
														.text(Math.round(sumProduct/sumOfWeights).toFixed(2));
			});

			function currentFiscalYear(element) {
				return element.FiscalYear === fiscalYear;
			};
			var expectedObservations = teacher.find(currentFiscalYear)['expected_obs'];
			// appends pending observation element to page for every 
			// observation expected in rest of current fiscal year
			for (var i = 0; i < expectedObservations - count; i++) {
				d3.select('.pending-observations').append('div')
							.classed('col s2 pending-observation', true);
			};
		});
	});