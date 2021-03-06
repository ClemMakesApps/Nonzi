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
  $scope.referral = $stateParams.refer;
  $scope.pledge = $stateParams.amount;
  $scope.selectedRecurring = $stateParams.isSubscription;

  var validForm = function() {
    var payment = $scope.payment;
    return ($scope.email
        && $scope.password
        && $scope.name
        && $scope.email == $scope.verifyEmail
        );
  }

  $scope.createAccount = function() {
    if(validForm()){

      var payment = $scope.payment;
      console.log('payment', payment);
      $auth.submitRegistration({
        email: $scope.email,
        password: $scope.password,
        password_confirmation: $scope.password,
        name: $scope.name
      })
      .then(function(result){
        console.log(result);
        if(result.status === 200){
          $state.go('auth.payment', $stateParams);
        }
      });
    }
  }
});
