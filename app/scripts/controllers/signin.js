'use strict';

/**
* @ngdoc function
* @name multiplyMe.controller:AboutCtrl
* @description
* # AboutCtrl
* Controller of the multiplyMe
*/
angular.module('multiplyMe')
.controller('SigninCtrl', function ($scope, $auth, $state, $rootScope) {
  $scope.showRequestMessage = false;
  $scope.showResetMessage = false;
  $rootScope.title = "Bhatti Mines School Donor Portal - MultiplyMe";
  $rootScope.ogTitle = 'MultiplyMe - Bhatti Mines School Project';
  $scope.$on('auth:password-reset-confirm-success', function(){
    $('.reset-password-modal').modal();
  });
  
  $scope.user = {};

  $scope.resetPassword = function(){
    $auth.updatePassword({password: $scope.passwordReset , password_confirmation: $scope.passwordResetConfirm}).then(function(){
      $scope.showResetMessage = true; 
    });
  }

  $scope.forgotPassword = function(){
    $auth.requestPasswordReset({email: $scope.forgotEmail}).then(function(){
      $scope.showRequestMessage = true;
    });
  }

  $scope.login = function(){
    if($scope.loginForm.$valid){
      $auth.submitLogin($scope.user)
      .then(function(resp){
        console.log("user logged in successfully: "+ resp); //for debugging purpose
        $state.go('auth.account');

      }).catch(function(resp){
        console.log("error while logging in: ", resp); //for debugging purpose
        $scope.user.password = '';
        $scope.loginForm.$setPristine();
        $scope.invalidCredentials = true;
      });
    }
  };

});
