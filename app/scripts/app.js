'use strict';

/**
* @ngdoc overview
* @name multiplyMe
* @description
* # multiplyMe
*
* Main module of the application.
*/

angular
.module('multiplyMe', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngTouch',
  'ng-token-auth',
  'ui.router'
])
.constant('URL', 'https://api.multiplyme.in/')
.config(function ($stateProvider, $urlRouterProvider, $authProvider, $locationProvider) {
  $authProvider.configure({
    apiUrl: 'https://api.multiplyme.in'
  });

  // $locationProvider.html5Mode(true);
  // $locationProvider.hashPrefix('!');

  $stateProvider
    .state('auth', {
      abstract: true,
      template: '<ui-view/>',
      resolve: {
        auth: function($auth){
          return $auth.validateUser();
        }
      }
    })
   .state('main', {
     url: '/?refer',
     templateUrl: 'views/main.html',
     controller: 'MainCtrl'
   })
  .state('contribute', {
    url: '/contribute?isSubscription&amount',
    params: {
      refer: null,
    },
    templateUrl: 'views/contribute.html',
    controller: 'ContributeCtrl'
  })
  .state('payment', {
    url: '/payment?isSubscription&amount&refer',
    templateUrl: 'views/payment.html',
    controller: 'PaymentCtrl'
  })
  .state('auth.account', {
    url: '/account',
    templateUrl: 'views/account.html',
    controller: 'AccountCtrl'
  })
  .state('receipt', {
    url: '/receipt/:donationId',
    templateUrl: 'views/receipt.html',
    controller: 'ReceiptCtrl',
    resolve: {
      Donation: function(DonationLoader, $stateParams){
        return DonationLoader($stateParams.donationId);
      }
    }
  })
  .state('sharedReceipt', {
    url: '/sharedReceipt/:donationId',
    templateUrl: 'views/sharedReceipt.html',
    controller: 'SharedReceiptCtrl',
    resolve: {
      ShareTree: function(ShareTreeLoader, $stateParams){
        return ShareTreeLoader($stateParams.donationId);
      }
    }
  })
  .state('share', {
    url: '/share/:donationId',
    templateUrl: 'views/share.html',
    controller: 'ShareCtrl'
  })
  .state('terms', {
    url: '/terms',
    templateUrl: 'views/toc.html'
  })
  .state('privacy', {
    url: '/privacy',
    templateUrl: 'views/privacy.html'
  })
  .state('mailchimp', {
    url: '/mailchimp',
    templateUrl: 'views/mailchimp.html'
  })
  .state('signin',{
    url: '/signin',
    templateUrl: 'views/signin.html',
    controller: 'SigninCtrl'
  });
$urlRouterProvider.otherwise('/');

}).run(function ($rootScope){
  $rootScope.config = config;

  //Pre-render title before controller sets title
  $rootScope.title = "MultiplyMe - Bhatti Mines School Project";

  //Auto scroll to top
  $rootScope.$on('$stateChangeSuccess', function() {
     document.body.scrollTop = document.documentElement.scrollTop = 0;
  });
});

