'use strict';

angular.module('nonziApp')
  .controller('ReportCtrl',['$scope', '$location', '$anchorScroll', '$state', 'Donation', 'localStorageService', function ($scope, $location, $anchorScroll, $state, Donation, localStorageService) {
    $scope.didDonate = localStorageService.get('didDonate') === "true";
    console.log($scope.didDonate);
    if($scope.didDonate){
      localStorageService.set('didDonate', false);
    }
    $scope.donation = Donation;

    if(Donation.downline.length < 3){
      $scope.people = 3 - Donation.downline.length;
    }
    else{
      $scope.people = 0;
    }

    $scope.expiration = new Date(Donation.createdAt);
    $scope.expiration.setDate($scope.expiration.getDate() + 3);
    var today = new Date();

    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var timeRemaining = Math.round(Math.abs((today.getTime() - $scope.expiration.getTime())/(oneDay)))

    if(timeRemaining <= 3){
      $scope.timeRemaining = timeRemaining;
    }
    else{
      $scope.timeRemaining = 0;
    }

    if($scope.people == 0) {
      $scope.securedPledge = true;
    }

    if($scope.people != 3 && $scope.timeRemaining == 0) {
      $scope.failedPledge = true;
    }

    $scope.goToHome = function() {
      $anchorScroll(0);
      $location.path("/");
    }

    $scope.goToPledge = function() {
      $anchorScroll(0);
      $state.go('pledge', {referralID: Donation._id});
    }
  }]);
