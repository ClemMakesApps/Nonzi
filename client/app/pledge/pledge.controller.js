'use strict';

angular.module('nonziApp')
  .controller('PledgeCtrl', function ($scope, Donation) {
    console.log(Donation);
    $scope.message = 'Hello';
  });
