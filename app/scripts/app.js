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
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .constant('URL', "http://localhost:3000")
  .config(function ($routeProvider) {
    $routeProvider
      .when('/donation',{
        templateUrl: 'views/donation.html',
        controller: 'DonationCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
