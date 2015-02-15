'use strict';

angular.module('nonziApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('getstarted', {
        url: '/getstarted',
        templateUrl: 'app/getstarted/getstarted.html',
        controller: 'MainCtrl'
      });
  });