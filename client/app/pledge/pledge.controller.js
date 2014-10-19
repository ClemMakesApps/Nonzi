'use strict';

angular.module('nonziApp')
  .controller('PledgeCtrl', ['$scope', 'Donation', function ($scope, Donation) {
    console.log(Donation);
    $scope.message = 'Hello';
}]);
