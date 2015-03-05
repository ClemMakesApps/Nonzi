'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:ContributeCtrl
 * @description
 * # ContributeCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('ContributeCtrl', function ($scope, $stateParams) {
  	$scope.selected = $stateParams.suggested;

  	$scope.suggestedDonations = [{
  		'amount': 195,
  		'recurring': false,
  		'message': 'Can help educate a child for a year'
  	},{
  		'amount': 17,
  		'recurring': false,
  		'message': 'Can help educate a child for a month'
  	},{
  		'amount': 4,
  		'recurring': true,
  		'message': 'Can help educate a child for 3 months'
  	}]

	$scope.suggestion = -1; 


	$scope.calculateSuggestion = function(pledgeAmount) {
		return Math.floor(pledgeAmount/12);
	}

	$scope.checkSuggestion = function() {
		if($scope.pledge > 0 && ($scope.selected == null || $scope.selected == -1) && $scope.suggestion == -1) {
			$scope.suggestion = $scope.calculateSuggestion($scope.pledge);
		}
	}

	$scope.loadSuggestion = function() {
		if($scope.selected <= $scope.suggestedDonations.length) {
			var selected = $scope.suggestedDonations[$scope.selected];
			$scope.pledge = selected.amount;

			if(selected.recurring) {
				$scope.selectedRecurring = true;
			} else {
				$scope.selectedRecurring = false;
			}

		}
	}

	$scope.catchSuggestion = function(pledgeAmount, recurring) {
		if(recurring == null) {
			recurring = false;
		}

		for(var i = 0; i < $scope.suggestedDonations.length; i++) {
			var suggestion = $scope.suggestedDonations[i];

			if(pledgeAmount == suggestion.amount && recurring == suggestion.recurring) {
				return i;
			}
		}

		return -1;
	}

	$scope.watchPledgeAndRecurring = function(newValue, oldValue) {
		if(newValue != oldValue) {
			$scope.selected = $scope.catchSuggestion($scope.pledge, $scope.selectedRecurring);

			// if($scope.selected == -1) {
			// 	$scope.checkSuggestion();
			// }
		}
	}


	$scope.$watch('pledge', $scope.watchPledgeAndRecurring);
	$scope.$watch('selectedRecurring', $scope.watchPledgeAndRecurring);

	$scope.loadSuggestion();
});
