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
  		'message': 'Can help educate a child for a year'
  	},{
  		'amount': 17,
  		'message': 'Can help educate a child for a month'
  	},{
  		'amount': 4,
  		'message': 'Can help educate a child for a week'
  	}]

	$scope.suggestion = -1; 

	$scope.calculateSuggestion = function(pledgeAmount) {
		return Math.floor(pledgeAmount/12);
	}

	$scope.checkSuggestion = function() {
		if($scope.pledge > 0) {
			$scope.suggestion = $scope.calculateSuggestion($scope.pledge);
		}
	}

	$scope.loadSuggestion = function() {
		if($scope.selected <= $scope.suggestedDonations.length) {
			var selected = $scope.suggestedDonations[$scope.selected];
			$scope.pledge = selected.amount;
		}
	}

	$scope.loadSuggestion();
});
