'use strict';

angular.module('nonziApp')
  .controller('MainCtrl', function ($scope, $location) {
      $scope.contribute = function() {
        $location.path("/pledge");
      }
  });
