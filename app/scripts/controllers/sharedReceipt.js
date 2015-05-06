'use strict';

angular.module('multiplyMe')
  .controller('SharedReceiptCtrl', function ($scope, $stateParams, $rootScope, ShareTree) {
    $rootScope.title = 'Will you join ' + ShareTree.parent.name + ' in supporting the Bhatti Mines School';

    console.log(ShareTree.children[0]);
    $scope.name = ShareTree.parent.name;
    $scope.parent = ShareTree.parent;
    $scope.children = ShareTree.children;
    $scope.impact = ShareTree.parent.donation.amount * .01;
    for(var i = 0; i < $scope.children.length; i++){
      console.log($scope.children[i].donation);
      $scope.impact += ($scope.children[i].donation.amount * .01);
    }
    $scope.donationId = $stateParams.donationId;
    
    console.log(!!$scope.children[0]);
    console.log($scope.name);
  });
