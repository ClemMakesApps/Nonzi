'use strict';

angular.module('multiplyMe')
  .controller('SharedReceiptCtrl', function ($scope, $stateParams, $rootScope, ShareTree) {
    $rootScope.title = 'Will you join ' + ShareTree.parent.name + ' in supporting the Bhatti Mines School';
    $rootScope.ogTitle = $rootScope.title;

    console.log(ShareTree);
    $scope.name = ShareTree.parent.name;
    $scope.parent = ShareTree.parent;
    $scope.children = ShareTree.children;
    $scope.personalImpact = ShareTree.personal_impact * .01;
    $scope.networkImpact = ShareTree.network_impact * .01;
    $scope.donationId = $stateParams.donationId;
    $scope.hoursRemaining = Math.round(ShareTree.hours_remaining);
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
      return name.split(' ').map(function (s) { return s.charAt(0); }).join('');
    }
  });
