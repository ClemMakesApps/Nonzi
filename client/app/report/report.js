'use strict';

angular.module('nonziApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('report', {
        url: '/report',
        templateUrl: 'app/report/report.html',
        controller: 'ReportCtrl',
        resolve: {
          DonationLoaded: ['DonationLoader',
            function(DonationLoader){
              return DonationLoader();
            }
          ]
        }
      });
  });
