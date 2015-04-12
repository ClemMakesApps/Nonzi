'use strict';

/**
 * @ngdoc function
 * @name multiplyMe.controller:ContributeCtrl
 * @description
 * # ContributeCtrl
 * Controller of the multiplyMe
 */
angular.module('multiplyMe').controller('ContributeCtrl', function ($scope, $stateParams, $rootScope, $timeout) {
  $rootScope.title = "Contribute to Bhatti Mines School Project";

  //Initalize 
  $scope.pledge = parseInt($stateParams.amount);
  $scope.selectedRecurring = $stateParams.isSubscription == "true";
  $scope.selectedPerk = -1;
  $scope.suggestedAmount = -1; 
  $scope.forceHideSuggested = false;  
  $scope.callbackDelay = 3000;  //milliseconds
  $scope.referral = Number($stateParams.refer);

  if($scope.referral) {
    $scope.referHref = 'refer=' + $scope.referral;
  }

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
  }];

  //Suggestion related methods
  $scope.calculateSuggestion = function(pledgeAmount) {
    return Math.ceil(pledgeAmount/12);
  }

  $scope.checkSuggestion = function() {
    if($scope.pledge > 12 && ($scope.selectedPerk == null || $scope.selectedPerk == -1) && $scope.suggestedAmount == -1) {
      $scope.suggestedAmount = $scope.calculateSuggestion($scope.pledge);
    }
  }

  $scope.hidePromo = function() {
    $scope.showPromo = false;
    $scope.forceHideSuggested = true;   
  }

  $scope.yesPromo = function() {
    $scope.hidePromo();
    $scope.pledge = $scope.suggestedAmount;
    $scope.selectedRecurring = true;
  }

  //Perk related methods
	$scope.selectPerk = function(index) {
		$scope.selectedPerk = index;
		$scope.pledge = $scope.suggestedDonations[index].amount;
		$scope.selectedRecurring = $scope.suggestedDonations[index].recurring;
	}

	$scope.catchPerk = function(pledgeAmount, recurring) {
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

  //Watcher functions
	var suggestionTimer = null;
	$scope.watchPledgeAndRecurring = function(newValue, oldValue) {
		if(newValue != oldValue) {
			$scope.selectedPerk = $scope.catchPerk($scope.pledge, $scope.selectedRecurring);

			if($scope.selectedPerk == -1 && $scope.suggestedAmount == -1 && $scope.selectedRecurring != true && newValue != true) {
				$timeout.cancel(suggestionTimer);

        var callback = function() {
          if($scope.selectedRecurring == false) {
            //last minute abort if selected
            $scope.checkSuggestion();
            // var alert = angular.element(document.querySelector( '.perk-promo' ));
            // alert.addClass('animated bounceIn');
            $scope.showPromo = true;
          }
        }

				var suggestionTimer = $timeout(callback, $scope.callbackDelay);
			}
		}
	}

	$scope.$watch('pledge', $scope.watchPledgeAndRecurring);
	$scope.$watch('selectedRecurring', $scope.watchPledgeAndRecurring);

  $scope.init = function() {
    $scope.selectedPerk = $scope.catchPerk($scope.pledge, $scope.selectedRecurring);
    if($scope.selectedPerk != -1) {
      $scope.forceHideSuggested = true;
    }
  }
  $scope.init();
});
