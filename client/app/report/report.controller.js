'use strict';

angular.module('nonziApp')
  .controller('ReportCtrl',['$scope', 'Donation', function ($scope, Donation) {
    console.log(Donation);
    $scope.message = 'Hello';
  }]);
