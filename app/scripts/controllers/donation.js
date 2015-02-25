'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:DonationCtrl
 * @description
 * # DonationCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('DonationCtrl',['$scope','Donation', function ($scope,Donation) {
    $scope.donation = Donation.get({id:$scope.id});

    $scope.saveDonation = function(){
      Donation.save($scope.donation,function(){
        console.log('Donation saved');
      });
    };
  }]);
