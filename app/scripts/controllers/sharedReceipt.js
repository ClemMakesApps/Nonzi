'use strict';

angular.module('multiplyMe')
  .controller('SharedReceiptCtrl', function ($scope, $stateParams, $rootScope, ShareTree) {
    $rootScope.title = 'Will you join ' + ShareTree.parent.name + ' in supporting the Bhatti Mines School';

    console.log(ShareTree);
    $scope.name = ShareTree.parent.name;
    $scope.parent = ShareTree.parent;
    $scope.children = ShareTree.children;
    $scope.impact = ShareTree.impact * .01;
    $scope.donationId = $stateParams.donationId;
    
    console.log(!!$scope.children[0]);
    console.log($scope.name);
  });
