'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:DonationCtrl
 * @description
 * # DonationCtrl
 * Controller of the appApp
 */
angular.module('multiplyMe')
  .controller('PaymentCtrl',['$scope','$auth',function ($scope,$auth) {
    $scope.payment = {}
    $scope.payment.user = {}

    $scope.register = function(){
      $auth.submitRegistration($scope.payment.user)
      .then(function(resp){

      })
      .catch(function(error){

      })
    }

  }]);
