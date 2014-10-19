'use strict';

angular.module('nonziApp')
  .controller('ReportCtrl',['$scope', 'Donation', function ($scope, Donation) {
    console.log(Donation);
    $scope.donation = Donation;
    console.log(Donation.downline.length);
    if(Donation.downline.length < 3){
      $scope.people = 3 - Donation.downline.length;
    }
    else{
      $scope.people = 0;
    }
    var timeRemaining = Donation.createdAt - Date.now();
    if(timeRemaining < 3){
      $scope.timeRemaining = timeRemaining;
    }
    else{
      $scope.timeRemaining = 0;
    }
    $scope.message = 'Hello';
  }]);
