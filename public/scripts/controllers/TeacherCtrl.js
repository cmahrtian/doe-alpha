angular.module('TeacherCtrl', [])
	.controller('TeacherController', function($scope) {
		// enables JQuery dynamicism for dropdown menu and collapsible completed
		// observation card
		setTimeout(function() {
			jQuery('.dropdown-button').dropdown();
		}, 0);
		jQuery('.collapsible').collapsible();

		// redirects app to Login page if user is not signed in
		// otherwise sets fiscal year to 2017
		var employeeID = window.sessionStorage.getItem('employeeID');
		var fiscalYear;
		if (employeeID === null) {
			window.location.replace('/');
		} else {
			fiscalYear = '2017';
			d3.select('.school-year h4').text(parseInt(fiscalYear)-1 +'-'+ +fiscalYear+ ' Observations')
		}
		// redirects to login page and clears sessionStorage when "Log Off" button
		// is clicked
		jQuery('.log-off').click(function() {
			sessionStorage.clear();
		})

		function teacherLookup(element) {
			return element.EmployeeID === employeeID;
		};
		// Previous Year's MOTP Score and Rating
		d3.csv('../data/YOY_Scores.csv', function(data) {
			if (data.some(teacherLookup)) {
				teacher = data.filter(teacherLookup);
				var previousYearScore = 0
				teacher.forEach(function(entry) {
					previousYearScore += parseFloat(entry.Y16_Weighted_Component_Score);
				});
				d3.select('.previous-motp #fiscal-year')
					.text((parseInt(fiscalYear)-2).toString() +'-'+ (parseInt(fiscalYear)-1).toString() + ' Year');
				d3.select('.previous-motp #score').text(previousYearScore.toFixed(2));
				if (previousYearScore.toFixed(2) < 1.76) {
					d3.select('.previous-motp #rating').text('Ineffective')
				} else if (previousYearScore.toFixed(2) >= 1.76 && previousYearScore.toFixed(2) < 2.51) {
					d3.select('.previous-motp #rating').text('Developing')
				} else if (previousYearScore.toFixed(2) >= 2.51 && previousYearScore.toFixed(2) < 3.26) {
					d3.select('.previous-motp #rating').text('Effective')
				} else {
					d3.select('.previous-motp #rating').text('Highly Effective')
				}
			} else {
				d3.select('.previous-motp .score').text('N/A');
			}
		});

		// Current fiscal year's observations (completed and pending)
		d3.csv('../data/Observations.csv', function(data) {
			var count = 0;
			// returns array of all observations for teacher in current fiscal year
			var teacher = data.filter(function(element) {
				return (element.EmployeeID === employeeID && element.FiscalYear === fiscalYear);
			});

			// creates arrays of unique MOTPIDs and components that have been
			// measured at least once in current fiscal year
			var currentYearMOTPIDs = [];
			var currentYearComponentIDs = [];
			teacher.forEach(function(element) {
				if (!currentYearMOTPIDs.includes(element.MOTPID)) {	
					currentYearMOTPIDs.push(element.MOTPID);
				};
				if (!currentYearComponentIDs.includes(element.MOTPComponentID) && element.Rating > 0) {
					currentYearComponentIDs.push(element.MOTPComponentID);
				};
			});
			
			// appends completed observation element to page for every 
			// observation completed thus far in current fiscal year	
			currentYearMOTPIDs.forEach(function(element) {
				count++;
				var completedObservation = d3.select('.collapsible.popout')
																		.append('li')
																		.classed('col s2', true);
				completedObservation.append('div')
														.classed('completed-observation collapsible-header', true);
				// adds day and month to completed observation element
				function findObservation(entry) {
					return entry.MOTPID === element;
				};
				var observation = teacher.find(findObservation);
				completedObservation.select('.collapsible-header')
														.append('h5')
														.text(observation.MOTPMonth +' '+ observation.MOTPDay);
				// creates array of components specific to the observation
				var observationComponents = teacher.filter(findObservation);
				var sumProduct = 0;
				var sumOfWeights = 0;
				// calculates sum product and sum of weights of components measured
				// during the observation
				observationComponents.forEach(function(entry) {
					if (entry.Rating > 0) {
						sumProduct += (entry.Rating * entry.MOTPComponentWeight);
						sumOfWeights += parseFloat(entry.MOTPComponentWeight);
					};
				});
				// calculates the observation score and appends it to completed
				// observation element
				var observationScore;
				if (sumOfWeights === 0) {
					observationScore = 'N/A';
				} else {
					observationScore = Math.round(sumProduct*100/sumOfWeights)/100;
				};
				completedObservation.select('.collapsible-header')
														.append('p')
														.classed('score', true)
														.text(observationScore);
				// add observation day, time period, and evaluator to gray box in top
				// left corner of collapsible
				completedObservation.append('div')
														.attr('class', 'collapsible-body')
														.attr('style', 'margin-left: ' + -(count-1)*162 + 'px')
														.append('div')
														.attr('class', 'observation-details')
														.insert('p')
														.text(observation.MOTPMonth +' '+ observation.MOTPDay +', '+ observation.MOTPYear);
				if (observation.TimePeriod != '') {
					completedObservation.select('.observation-details')
															.insert('p')
															.text(observation.TimePeriod);
				};
				var evaluator = observation.EvaluatorName.split(' ')
																								.reverse()
																								.join(' ');
				completedObservation.select('.observation-details')
														.insert('p')
														.text('Evaluator: ' + evaluator);
				// adds properly formatted evaluator comments (if they exist) to
				// collapsible body 
				if (observation.Comments != '') {
					completedObservation.select('.collapsible-body')
															.append('div')
															.attr('class', 'evaluation-notes')
															.append('h5')
															.text('Evaluation Notes');
					completedObservation.select('.evaluation-notes')
															.append('div')
															.attr('class', 'full-text');
					var formattedComments = observation.Comments.split(/\r?\n/);
					formattedComments.forEach(function(entry) {
						if (entry != '') {
							completedObservation.select('.full-text')
																	.append('p')
																	.text(entry);
						};
					});
				};
				// creates section for component scores if at least one component was
				// measured in observation
				for (var i = 0; i < observationComponents.length; i++) {
					if (observationComponents[i].Rating > 0) {
						completedObservation.select('.collapsible-body')
																.append('div')
																.attr('class', 'component-scores')
																.append('h5')
																.text('Component Scores');
						break;
					};
				};
				// adds (in order) the component score, bar of corresponding length,
				// component name/description, and component rationale to collapsible
				observationComponents.forEach(function(entry) {
					var componentScores = completedObservation.select('.component-scores');
					if (entry.Rating > 0) {
						componentScores.append('h4')
													.attr('class', 'component-rating')
													.style('margin-right', 5*(4 - entry.Rating) + '%')
													.text(entry.Rating);
						componentScores.append('div')
													.attr('class', 'component-bar')
													.style('width', 5 + 5*(entry.Rating) + '%');
						componentScores.append('p')
													.attr('class', 'component-descriptor')
													.text(entry.MOTPComponentDescription);
						componentScores.append('p')
													.attr('class', 'component-rationale')
													.text(entry.ComponentRationale);
					};
				});
			});

			// appends pending observation element to page for every observation
			// expected in rest of current fiscal year
			for (var i = 0; i < teacher[0]['expected_obs'] - count; i++) {
				d3.select('.pending-observations')
					.append('div')
					.classed('col s2 pending-observation', true);
			};
			// calculates YTD MOTP score
			var MOTPNumerator = 0;
			var MOTPDenominator = 0;
			currentYearComponentIDs.forEach(function(element) {
				function findComponent(entry) {
					return (entry.MOTPComponentID === element) && (entry.Rating > 0);
				};
				// calculates YTD sum of each component measured in current fiscal year
				var components = teacher.filter(findComponent);
				var ratingsSum = 0;
				components.forEach(function(entry) {
					ratingsSum += parseInt(entry.Rating);
				});
				// adds YTD weighted component average of each component measured in
				// current fiscal year to YTD MOTP numerator (i.e. sum of weighted
				// components of measured components)
				MOTPNumerator += (ratingsSum/components.length)*components[0].MOTPComponentWeight;
				// adds component weight of each component measured in current fiscal
				// year to YTD MOTP denominator (i.e. sum of weights of measured
				// components)
				MOTPDenominator += parseFloat(components[0].MOTPComponentWeight);
			});
			// appends YTD MOTP score to page
			d3.select('.current-score')
				.append('p')
				.text((Math.round(MOTPNumerator*100/MOTPDenominator)/100)
				.toFixed(2));
		});
	});