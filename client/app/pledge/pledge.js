'use strict';

angular.module('nonziApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('pledge', {
        url: '/pledge?referralID',
        templateUrl: 'app/pledge/pledge.html',
        controller: 'PledgeCtrl'
      })
  });
