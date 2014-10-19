'use strict';

angular.module('nonziApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('pledge', {
        url: '/pledge',
        templateUrl: 'app/pledge/pledge.html',
        controller: 'PledgeCtrl'
      })

      .state('pledge.id', {
        url: '/pledge/{id}',
        templateUrl: 'app/pledge/pledge.html',
        controller: 'PledgeCtrl'
      });
  });
