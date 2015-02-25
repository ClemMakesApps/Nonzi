'use strict';

/**
* @ngdoc overview
* @name appApp
* @description
* # appApp
*
* Main module of the application.
*/
angular
.module('appApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngTouch',
  'ng-token-auth',
  'ui.router'
])
.constant('URL', 'http://localhost:3000')
.config(function ($stateProvider,$urlRouterProvider) {
  $stateProvider
  .state('main', {
    url: '/',
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  })
  .state('terms', {
    url: '/terms',
    templateUrl: 'views/toc.html'
  })
  .state('privacy', {
    url: '/privacy',
    templateUrl: 'views/privacy.html'
  })
  .state('report', {
    url: '/report/:id',
    templateUrl: 'views/report.html',
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
          delay.reject('Unable to retrieve donation');
        });
        return delay.promise;
      }
    ]
  }
})
.state('pledge', {
  url: '/pledge?referralID',
  templateUrl: 'views/pledge.html',
  controller: 'PledgeCtrl'
});
$urlRouterProvider.otherwise('/');
});
