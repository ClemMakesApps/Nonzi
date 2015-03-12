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
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
   .state('main', {
     url: '/',
     templateUrl: 'views/main.html',
     controller: 'MainCtrl'
   })
  //.state('main', {
  //  url: '/',
  //  templateUrl: 'views/firstpage.html',
  //  controller: 'FirstpageCtrl'
  //})
  .state('contribute', {
    url: '/contribute?suggested',
    templateUrl: 'views/contribute.html',
    controller: 'ContributeCtrl'
  })
  .state('payment', {
    url: '/payment',
    templateUrl: 'views/payment.html'
  })
  .state('receipt', {
    url: '/receipt',
    templateUrl: 'views/receipt.html'
  })
  .state('terms', {
    url: '/terms',
    templateUrl: 'views/toc.html'
  })
  .state('privacy', {
    url: '/privacy',
    templateUrl: 'views/privacy.html'
  })
  .state('signin',{
    url: '/signin',
    templateUrl: 'views/signin.html',
    controller: 'SigninCtrl'
  });
$urlRouterProvider.otherwise('/');

});
