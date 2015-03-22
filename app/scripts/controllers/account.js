'use strict';

/**
 * @ngdoc function
 * @name multiplyMe.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the multiplyMe
 */
angular.module('multiplyMe')
  .controller('AccountCtrl', ['$scope', '$state', 'Donation', '$auth', function ($scope, $state, Donation, $auth) {
    $scope.donation = {}
    // Donation ID is hard coded right now
    Donation.get({id:1}).$promise.then( function (data){
      $scope.donation = data.donation;
      $scope.monthly = Math.floor(($scope.donation.amount / 12) * 100) / 100;
    });
    //Email hard coded
    $scope.updatePassword = function(){
      $auth.submitLogin({
        email: "frasermince@gmail.com",
        password: $scope.oldPassword
      }).then( function (data){
        $auth.updatePassword({
          password: $scope.newPassword,
          password_confirmation: $scope.confirmPassword
        }).then( function (data) {
          alert("Password updated successfully");
          $scope.oldPassword = "";
          $scope.newPassword = "";
          $scope.confirmPassword = "";
        })
      });
    }

    $scope.logout = function(){
      $auth.signOut().then( function (resp){
        $state.go('signin');
      });
    }

  }]);
