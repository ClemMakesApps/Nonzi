'use strict';

angular.module('nonziApp')
  .controller('MainCtrl', function ($scope, $location, $anchorScroll) {
      $scope.contribute = function() {
        $anchorScroll(0);
        $location.path("/pledge");
      }
  });
