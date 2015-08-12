'use strict';

angular.module('multiplyMe')
  .controller('SharedReceiptCtrl', function ($scope, $stateParams, $rootScope, $timeout, ShareTree) {
    $rootScope.title = 'Will you join ' + ShareTree.parent.name + ' in supporting Back on my Feet Austin';
    $rootScope.ogTitle = $rootScope.title;

    console.log(ShareTree);
    $scope.paid = ShareTree.paid;
    $scope.name = ShareTree.parent.name;
    $scope.parent = ShareTree.parent;
    $scope.children = ShareTree.children;
    $scope.remainingChildren = 3 - ShareTree.children.length;
    for(var i = 0; i < 3; i++){
      console.log('hi', $scope.children[i]);
      $scope.children[i] = $scope.children[i] === undefined ? {image_url: 'https://s3.amazonaws.com/multiplyme.in/unknown-donor.png'} : $scope.children[i]
    }
    console.log('children', $scope.children);
    $scope.personalImpact = ShareTree.personal_impact * .01;
    $scope.networkImpact = ShareTree.network_impact * .01;
    $scope.donationId = $stateParams.donationId;
    if($scope.personalImpact != 0){
      $scope.leverage = ($scope.networkImpact / $scope.personalImpact).toFixed(2);
    }
    else {
      $scope.leverage = $scope.networkImpact / 1
    }
    console.log('share tree', ShareTree.hours_remaining);
    $scope.hoursRemaining = Math.round(ShareTree.hours_remaining);
    $scope.minutesRemaining = Math.round((ShareTree.hours_remaining - Math.floor(ShareTree.hours_remaining)) * 60);
    if($scope.minutesRemaining.toString().length === 1){
      $scope.minutesRemaining = '0' + $scope.minutesRemaining;
    }
    $scope.daysRemaining = Math.round($scope.hoursRemaining / 24);
    $scope.recurring = ShareTree.parent.donation.is_subscription;
    $scope.referral = ShareTree.referral_code;
    $scope.firstName = ShareTree.parent.name.split(' ')[0]

    console.log(!!$scope.children[0]);
    console.log($scope.name);

    if(ShareTree.number_of_children >= 3) {
        $scope.fulfilled = true;
    }

    if(ShareTree.paid) {
        $scope.fulfilled = true;
    }


	if (ShareTree.hours_remaining < 0) {
        $scope.challengeOver = true;
    }
	
    $scope.getInitials = function(name){
      if(name != null){
        return name.split(' ').map(function (s) { return s.charAt(0); }).join('');
      }
    }

    var countdownTimer;
    function countdown() {
        countdownTimer = $timeout(function() {
            $scope.minutesRemaining--;

            if($scope.minutesRemaining == -1 && $scope.hoursRemaining > 0) {
                $scope.minutesRemaining = 60;
                $scope.hoursRemaining--;
            }

            if($scope.minutesRemaining == 0 && $scope.hoursRemaining == 0) {
                $timeout.cancel(countdownTimer);
            } else {
                countdown();
            }
        }, 60*1000);
    }
    countdown();
    
  });
