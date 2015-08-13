'use strict';

/**
* @ngdoc function
* @name multiplyMe.controller:AboutCtrl
* @description
* # AboutCtrl
* Controller of the multiplyMe
*/
angular.module('multiplyMe')
.controller('SigninCtrl', function ($scope, $auth, $state, $rootScope, $stateParams, EmailSubscribe) {
    console.log($stateParams.amount);
  $scope.loginAction = function(){
    if($stateParams.amount === undefined){
      $scope.login();
    }
    else{
      $scope.logon();
    }
  }

  $scope.pledge = $stateParams.amount;
  $scope.selectedRecurring = $stateParams.isSubscription;
  $scope.referral = $stateParams.refer;
  $scope.showRequestMessage = false;
  $scope.showResetMessage = false;
  $rootScope.title = "Back on My Feet Austin Donor Portal - MultiplyMe";
  $rootScope.ogTitle = 'MultiplyMe - Back on My Feet Austin';
  $scope.$on('auth:password-reset-confirm-success', function(){
    console.log('here');
    $('.reset-password-modal').modal();
  });

  $scope.$on('auth:password-reset-confirm-error', function(ev, reason){
    console.log('hi', ev);
    console.log('reason', reason);
    //$('.reset-password-modal').modal();
  });
  console.log('state', $stateParams);
  if($stateParams.unsubscribe == 'true'){
    $('.unsubscribe-modal').modal();
  }
  $scope.user = {};

  $scope.unsubscribeFromEmail = function(){
    $auth.submitLogin({email: $scope.unsubscribeEmail, password: $scope.unsubscribePassword}).then(function(){
      EmailSubscribe.delete({}, function(){
        $scope.unsubscribeSuccess = true;
      });
    });
  }

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

  $scope.logon = function(){
    if($scope.loginForm.$valid){
      $auth.submitLogin($scope.user)
      .then(function(resp){
        console.log("user logged in successfully: "+ resp); //for debugging purpose
        $state.go('auth.payment', $stateParams);

      }).catch(function(resp){
        console.log("error while logging in: ", resp); //for debugging purpose
        $scope.user.password = '';
        $scope.loginForm.$setPristine();
        $scope.invalidCredentials = true;
      });
    }
  };
});
