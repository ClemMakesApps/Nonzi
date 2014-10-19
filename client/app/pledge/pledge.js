'use strict';

angular.module('nonziApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('pledge', {
        url: '/pledge',
        templateUrl: 'app/pledge/pledge.html',
        controller: 'PledgeCtrl',
        resolve: {
          Donation: ['DonationLoader',
            function(DonationLoader){
              return DonationLoader();
            }
          ]
        }
      });
  });
