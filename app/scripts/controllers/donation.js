'use strict';

/**
 * @ngdoc function
 * @name multiplyMe.controller:DonationCtrl
 * @description
 * # DonationCtrl
 * Controller of the multiplyMe
 */
angular.module('multiplyMe')
  .controller('DonationCtrl',['$scope','Donation', function ($scope,Donation) {
    $scope.donation = Donation.get({id:$scope.id});

    $scope.saveDonation = function(){
      Donation.save($scope.donation,function(){
        console.log('Donation saved');
      });
    };
  }]);
