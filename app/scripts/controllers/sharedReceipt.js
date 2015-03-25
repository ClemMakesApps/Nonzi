'use strict';

angular.module('multiplyMe')
  .controller('SharedReceiptCtrl', function ($scope, ShareTree) {
    console.log(ShareTree.children[0]);
    $scope.name = ShareTree.parent.name;
    $scope.parent = ShareTree.parent;
    $scope.children = ShareTree.children;
    console.log(!!$scope.children[0]);
    console.log($scope.name);
  });
