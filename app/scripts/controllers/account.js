'use strict';

/**
 * @ngdoc function
 * @name multiplyMe.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the multiplyMe
 */
angular.module('multiplyMe')
  .controller('AccountCtrl', ['$scope', 'auth', '$state', function ($scope, auth, $state) {
    if(!auth){
      $state.go('/signin');
    }
  }]);
