'use strict';

/**
 * @ngdoc function
 * @name multiplyMe.controller:ContributeCtrl
 * @description
 * # ContributeCtrl
 * Controller of the multiplyMe
 */
angular.module('multiplyMe')
  .controller('ContributeCtrl', function ($scope, $stateParams, $timeout) {
  	$scope.selected = $stateParams.suggested;

  	$scope.suggestedDonations = [{
      'amount': 175,
      'recurring': true,
      'message': 'Can help fund my trip for a month'
    },{
      'amount': 70,
      'recurring': false,
      'message': 'Can help fund my trip for a day'
    },{
      'amount': 20,
      'recurring': true,
      'message': 'Can help fund basic travel for a month'
    }]

	$scope.suggestion = -1; 

	$scope.calculateSuggestion = function(pledgeAmount) {
		return Math.floor(pledgeAmount/12);
	}

	$scope.checkSuggestion = function() {
		if($scope.pledge > 12 && ($scope.selected == null || $scope.selected == -1) && $scope.suggestion == -1) {
			$scope.suggestion = $scope.calculateSuggestion($scope.pledge);
		}
	}

	$scope.selectPerk = function(index) {
		$scope.selected = index;
		$scope.pledge = $scope.suggestedDonations[index].amount;
		$scope.selectedRecurring = $scope.suggestedDonations[index].recurring;
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

	var suggestionTimer = null;
	$scope.watchPledgeAndRecurring = function(newValue, oldValue) {
		if(newValue != oldValue) {
			$scope.selected = $scope.catchSuggestion($scope.pledge, $scope.selectedRecurring);

			if($scope.suggestion == -1 && $scope.selectedRecurring != true) {
				$timeout.cancel(suggestionTimer);
				var suggestionTimer = $timeout(
                        function() {
							$scope.checkSuggestion();

                        	var alert = angular.element( document.querySelector( '.perk-promo' ) );
							alert.addClass('animated bounceIn');    
                        },
                        2000
                    );
			}
		}
	}

	$scope.hidePromo = function() {
		var alert = angular.element( document.querySelector( '.perk-promo' ) );
		alert.addClass('bounceOut'); 
		$scope.prevDisplayed = true;   
	}

	$scope.yesPromo = function() {
		$scope.hidePromo();
		$scope.pledge = $scope.suggestion;
		$scope.selectedRecurring = true;
	}



	$scope.$watch('pledge', $scope.watchPledgeAndRecurring);
	$scope.$watch('selectedRecurring', $scope.watchPledgeAndRecurring);

	$scope.loadSuggestion();
});
