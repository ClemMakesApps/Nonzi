'use strict';

angular.module('nonziApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('report', {
        url: '/report/:id',
        templateUrl: 'app/report/report.html',
        controller: 'ReportCtrl',
        resolve: {
          Donation: ['$q', 'Donation', '$stateParams',
            function($q, Donation, $stateParams){
              console.log($stateParams);
              var delay = $q.defer();
              Donation.get({'id': $stateParams.id},
                function(donation){
                  console.log('here');
                  delay.resolve(donation);
                },function(){
                  console.log('here1');
                  delay.reject("Unable to retrieve donation");
                });
                return delay.promise;
            }
          ]
        }
      });
  });
