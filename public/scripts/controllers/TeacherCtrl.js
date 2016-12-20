angular.module('TeacherCtrl', [])
	.controller('TeacherController', function($scope) {
		setTimeout(function() {
			jQuery('.dropdown-button').dropdown();
		}, 0);

		jQuery('.collapsible').collapsible();

		// Test Teacher = Gijulal Pierce (Renaissance School of the Arts)
		// Figure out alternative way how to delcare as universal variable
		// var employeeID = '0371827';
		var employeeID = '0804202'
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
			var currentYearComponentIDs = [];
			
			teacher.forEach(function(element) {
				if (element.FiscalYear === fiscalYear) {	
					currentYearComponents.push(element);
				};
				if ((element.FiscalYear === fiscalYear) && (!currentYearMOTPIDs.includes(element.MOTPID))) {	
					currentYearMOTPIDs.push(element.MOTPID);
				};
				if ((element.FiscalYear === fiscalYear) && (!currentYearComponentIDs.includes(element.MOTPComponentID)) && (element.Rating > 0)) {
					currentYearComponentIDs.push(element.MOTPComponentID);
				};
			});
			
			currentYearMOTPIDs.forEach(function(element) {
				count++;
				// appends completed observation element to page for every 
				// observation completed thus far in current fiscal year
				var completedObservation = d3.select('.collapsible.popout')
																		.append('li')
																		.classed('col s2', true);
				completedObservation.append('div')
														.classed('completed-observation collapsible-header', true);
				function findObservation(entry) {
					return (entry.MOTPID === element);
				};
				var observation = currentYearComponents.find(findObservation);
				completedObservation.select('.collapsible-header')
														.append('h5')
														.text(observation.MOTPMonth +' '+ observation.MOTPDay);
				var observationComponents = currentYearComponents.filter(findObservation);
				var sumProduct = 0;
				var sumOfWeights = 0;
				observationComponents.forEach(function(entry) {
					sumProduct += (entry.Rating * entry.MOTPComponentWeight);
					sumOfWeights += parseFloat(entry.MOTPComponentWeight);
				});
				completedObservation.select('.collapsible-header')
														.append('p')
														.classed('score', true)
														.text(Math.round(sumProduct*100/sumOfWeights)/100);
				completedObservation.append('div')
														.attr('class', 'collapsible-body')
														.append('div')
														.attr('class', 'observation-details')
														.insert('p')
														.text(observation.MOTPMonth +' '+ observation.MOTPDay);
				var evaluator = observation.EvaluatorName.split(' ').reverse().join(' ');
				completedObservation.select('.observation-details')
														.insert('p')
														.text('Evaluator: ' + evaluator);
				if (observation.OverallComments != '') {
					completedObservation.select('.collapsible-body')
															.append('div')
															.attr('class', 'evaluation-notes')
															.append('h5')
															.text('Evaluation Notes');
				};
				console.log(observation.OverallComments);
			});

			function currentFiscalYear(element) {
				return element.FiscalYear === fiscalYear;
			};
			var expectedObservations = teacher.find(currentFiscalYear)['expected_obs'];
			// appends pending observation element to page for every 
			// observation expected in rest of current fiscal year
			for (var i = 0; i < expectedObservations - count; i++) {
				d3.select('.pending-observations')
					.append('div')
					.classed('col s2 pending-observation', true);
			};
			var MOTPNumerator = 0;
			var MOTPDenominator = 0;	
			currentYearComponentIDs.forEach(function(element) {
				function findComponent(entry) {
					return entry.MOTPComponentID === element;
				};
				
				var components = currentYearComponents.filter(findComponent);
				var ratingsSum = 0
				components.forEach(function(entry) {
					ratingsSum += parseInt(entry.Rating);
				});
				
				MOTPNumerator += (ratingsSum/components.length)*components[0].MOTPComponentWeight;
				MOTPDenominator += parseFloat(components[0].MOTPComponentWeight);
			});
			
			d3.select('.current-score p')
				.text((Math.round(MOTPNumerator*100/MOTPDenominator)/100)
				.toFixed(1));
		});
	});