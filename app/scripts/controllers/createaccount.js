'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:CreateAccountCtrl
 * @description
 * # CreateAccountCtrl
 * Controller of the appApp
 */
angular.module('multiplyMe')
  .controller('CreateAccountCtrl', function ($scope, $auth, $state, $stateParams) {
    $scope.createAccount = function() {
      var payment = $scope.payment;
      $auth.submitRegistration({
        email: payment.user.email,
        password: $scope.password,
        password_confirmation: $scope.password,
        name: payment.user.name
      })
      .then(function(result){
        console.log(result);
        if(result.status === 200){
          $state.go('payment', $stateParams);
        }
      });
    }
  });
