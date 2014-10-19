'use strict';

angular.module('nonziApp')
  .controller('ReportCtrl', ['$scope', 'Donation', '$state',
    function ($scope, Donation, $state) {
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
    $scope.goToPledge = function(){
      $state.go('pledge', {referralID: Donation._id});
    }
  }]);
