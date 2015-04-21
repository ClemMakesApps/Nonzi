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
  $rootScope.title = "Bhatti Mines School Donor Portal - MultiplyMe";
  
  $scope.user = {};

  $scope.forgotPassword = function(){
    $auth.requestPasswordReset($scope.forgotEmail);
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
