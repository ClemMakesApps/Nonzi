'use strict';

/**
 * @ngdoc function
 * @name multiplyMe.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the multiplyMe
 */
angular.module('multiplyMe')
  .controller('SigninCtrl', function ($scope,$auth) {

    $scope.user = {};

    $scope.login = function(){
      $auth.submitLogin($scope.user)
      .then(function(resp){
        console.log("user logged in successfully: "+ resp); //for debugging purpose
      }).catch(function(resp){
        console.log("error while logging in: " + resp); //for debugging purpose
      });
    };

  });
