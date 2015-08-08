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
  'ui.router',
  'ngFacebook'
])
.constant('URL', 'http://104.236.212.96/')
.config( [
    '$compileProvider',
    function( $compileProvider )
    {   
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|sms|chrome-extension):/);
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
    }
])
.config(function ($stateProvider, $urlRouterProvider, $authProvider, $locationProvider, $facebookProvider) {
  $authProvider.configure({
    apiUrl: 'http://104.236.212.96',
    storage: 'localStorage'
  });
  $facebookProvider.setAppId('1417661645206719');

  $locationProvider.hashPrefix('!');

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
    url: '/contribute?isSubscription&amount&refer',
    templateUrl: 'views/contribute.html',
    controller: 'ContributeCtrl'
  })
  .state('createaccount', {
    url: '/createaccount?isSubscription&amount&refer',
    templateUrl: 'views/createaccount.html',
    controller: 'CreateAccountCtrl'
  })
  .state('donorlogin', {
    url: '/donorlogin?isSubscription&amount&refer',
    templateUrl: 'views/donorlogin.html',
    controller: 'SigninCtrl'
  })
  .state('auth.payment', {
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
    controller: 'ShareCtrl',
    resolve: {
      Donation: function(DonationLoader, $stateParams){
        return DonationLoader($stateParams.donationId);
      }
    }
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
  .state('team', {
    url: '/team',
    templateUrl: 'views/team.html'
  })
  .state('howitworks', {
    url: '/howitworks',
    templateUrl: 'views/howitworks.html'
  })
  .state('shareDonated', {
    url: '/shareDonated',
    templateUrl: 'views/shareDonated.html'
  })
  .state('shareChallenge', {
    url: '/shareChallenge',
    templateUrl: 'views/shareChallenge.html'
  })
  .state('shareChallengeComplete', {
    url: '/shareChallengeComplete',
    templateUrl: 'views/shareChallengeComplete.html'
  })
  .state('signin',{
    url: '/signin?unsubscribe',
    templateUrl: 'views/signin.html',
    controller: 'SigninCtrl'
  });
  $urlRouterProvider.otherwise('/');

}).run(function ($rootScope, $animate, $window, $location){
  $rootScope.config = config;

  //Pre-render title before controller sets title
  $rootScope.title = "MultiplyMe - Back on My Feet Austin";

  //Auto scroll to top
  $rootScope.$on('$stateChangeSuccess', function() {
     document.body.scrollTop = document.documentElement.scrollTop = 0;
  });

  $rootScope.$on('$stateChangeStart', function() {
    $animate.enabled(false);

    //Hack for defaulting description when the page is not the share page
    var path = $location.path();
    var found = path.indexOf("/share/");

    if(found == -1) {
      $rootScope.description = 'Back on My Feet uses running to help adults experiencing homelessness build skills for self-sufficiency and independent living. Join our MultiplyMe challenge today and help our Members move their lives forward!';
    }
  })

  $rootScope.$on('$viewContentLoaded', function() {
    $rootScope.absUrl = $location.absUrl();
  })

  (function(){
    // If we've already installed the SDK, we're done
    if (document.getElementById('facebook-jssdk')) {return;}

    // Get the first script element, which we'll use to find the parent node
    var firstScriptElement = document.getElementsByTagName('script')[0];

    // Create a new script element and set its id
    var facebookJS = document.createElement('script'); 
    facebookJS.id = 'facebook-jssdk';

    // Set the new script's source to the source of the Facebook JS SDK
    facebookJS.src = 'https://connect.facebook.net/en_US/all.js';

    // Insert the Facebook JS SDK into the DOM
    firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
  }());
});

