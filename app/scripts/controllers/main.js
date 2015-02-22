'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('MainCtrl', function ($scope,$location, $anchorScroll) {
    $scope.contribute = function() {
      $anchorScroll(0);
      $location.path("/pledge");
    }
  });
