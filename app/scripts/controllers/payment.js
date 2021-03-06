'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:DonationCtrl
 * @description
 * # DonationCtrl
 * Controller of the appApp
 */
angular.module('multiplyMe')
  .controller('PaymentCtrl', function ($rootScope, $scope, $auth, $timeout, Donation, $q, $stateParams, $state, $anchorScroll, name, $facebook, $window) {
    $rootScope.title = 'Contribute to Back on My Feet Austin';
    $rootScope.ogTitle = $rootScope.title;
    $rootScope.$on('auth:validation-success', function(ev, user) {
      $scope.signedIn = true;
      $scope.authUser.name = user.name;
      $scope.payment.user = {
        'name': user.name,
        'email': user.email,
        'verifyEmail': user.email
      }
    });
    $rootScope.$on('auth:validation-error', function(ev) {
      $scope.signedIn = false;
    });
    $scope.subscribe = true;


    if($stateParams.refer != null) {
      $scope.referral = Number($stateParams.refer);
    }
  
    $scope.signedIn = $auth.user.signedIn;
    $scope.amount = $stateParams.amount;
    $scope.isSubscription = $stateParams.isSubscription == "true";
    $scope.authUser = {
      'name': $auth.user.name,
      'email': $auth.user.email
    };

    $scope.facebook = function(){
      //console.log('READY', Facebook.isReady());
      //while(!Facebook.isReady()){console.log('here')}
      //var response = $facebook.getLoginStatus();
      var response = $facebook.getLoginStatus();
      console.log('hi', response);
      response
        .then(function(response){
          console.log('it worked!', response);
          if(response.authResponse == null){
            $auth.authenticate('facebook')
              .then(function(){
                console.log('here');
              })
              .catch(function(){
                console.log('there');
              });
          }
          else{
            $auth.authenticate('facebook', {params: {code: response.authResponse.signedRequest}})
              .then(function(){
                console.log('here');
              })
              .catch(function(){
                console.log('there');
              });
          }
        })
      .catch(function(response){
        console.log('error', response);
      });
      $scope.highlightChallenge();
    }

    $scope.payment = {}
    $scope.payment.user = {
      'name': $scope.authUser.name,
      'email': $scope.authUser.email,
      'verifyEmail': $scope.authUser.email
    }
    $scope.payment.referral = $stateParams.refer;

    $scope.expirationYears = [];
    $scope.expirationMonths = [];
    $scope.hasReferral = !isNaN($stateParams.refer);
    console.log($stateParams.refer);
    if($scope.hasReferral) {
      name.get({id: $stateParams.refer}, function(result){
        $scope.referralName = result.name;
        $scope.referralChildren = result.number_of_children;
        $scope.referralPaid = result.is_paid;
        console.log(result);
      });
    }

    var validateCard = function(){
      var payment = $scope.payment;
        return payment.user.name
        && payment.cardNumber
        && payment.expirationYear
        && payment.expirationMonth
        && payment.cvc
        && payment.zip
    }

    var validateUser = function(){
      var payment = $scope.payment;
        return payment.user.email
        && payment.user.verifyEmail
        && $scope.password;
    }

    var validateFormSubmission = function(){
      return ($scope.signedIn
        && validateCard())
        || (validateUser()
        && validateCard());
    }

    var createToken = function(number, exp_month, exp_year, cvc){
      var deferred = $q.defer();
      Stripe.setPublishableKey(config.stripeKey);
      Stripe.card.createToken({
        number: number,
        exp_month: exp_month,
        exp_year: exp_year,
        cvc: cvc
      },
      function(status, response){
        if(response.error){
          deferred.reject(response.error);
        }
        else{
          deferred.resolve(response.id);
        }
      });
      return deferred.promise;
    };

    var logInUser = function(){
      var payment = $scope.payment;
      $auth.submitLogin({
        email: payment.user.email,
        password: $scope.password
      }).then(function(){
        createDonation();
      })
    }

    var createDonation = function(){
      var referrer = $stateParams.refer
      var payment = $scope.payment;
      var email = payment.user.email ? payment.user.email : $auth.user.email;
      createToken(
        payment.cardNumber,
        payment.expirationMonth,
        payment.expirationYear,
        payment.cvc)
        .then(function(token){
          Donation.save({
            donation: {
              amount: Math.floor($stateParams.amount * 100),
              is_subscription: $scope.isSubscription,
              is_challenged: $scope.isChallenged,
              organization_id: 2
            },
            card: {
              token: token,
              email: email
            },
            subscribe: $scope.subscribe,
            referral_code: $scope.payment.referral
          },
          function(result){
            localStorage.setItem("receiptYes", "true");
            $state.go('receipt', {donationId: result.donation.id});
          },
          function(response){
            var errorMessage = response.data.error;

            if(errorMessage == null) {
              errorMessage = response.statusText + " (" + response.status + "). Please contact support@multiplyme.in";
            }

            if(errorMessage === "Your card's security code is incorrect.") {
              $scope.payment.cvc = null;
            }

            if(errorMessage === "Your card was declined.") {
              $scope.payment.cardNumber = null;
              $scope.payment.cvc = null;
            }

            if(errorMessage === "Your card has expired.") {
              $scope.payment.cardNumber = null;
              $scope.payment.cvc = null;
            }

            $scope.signedIn = true;
            $scope.setErrorMessage(errorMessage);
          });
        }).catch(function(response) {
          if(response.code === "incorrect_number") {
            $scope.payment.cardNumber = null;
          }

          if(response.code === "invalid_cvc") {
            $scope.payment.cvc = null;
          }

          if(response.code === "card_declined") {
            $scope.payment.cardNumber = null;
            $scope.payment.cvc = null;
          }

          $scope.signedIn = true;
          $scope.setErrorMessage(response.message);
        });
    }

    $scope.challengeSubmit = function(){
      $scope.isChallenged = true;
      submit();
    }
    $scope.unchallengedSubmit = function(){
      $scope.isChallenged = false;
      $scope.donateStatus = "Processing";
      $scope.donateTextLarge = "Donation";
      $scope.donating = true;
      submit();
    }

    $scope.setErrorMessage = function(message) {
      $anchorScroll(0);
      $scope.challengeProgress = null;
      $scope.enableLoading = false;
      $scope.donating = false;
      $scope.highlightNext = false;

      $scope.donateStatus = "Skip challenge and";
      $scope.donateTextLarge = "Donate Instead";

      $scope.errorMessage = message;
      $timeout.cancel(highlightTimer);
    }

    var submit = function(){
      $timeout.cancel(highlightTimer);
      if(validateFormSubmission() && $scope.signedIn){
        if(!$scope.donating) {
          $scope.enableLoading = true;
          $scope.challengeProgress = "Processing";
        }
        createDonation();
      }
      else{
        console.log('somethin wrong');
      }
    };

    $scope.generateYears = function() {
      var thisYear = new Date().getFullYear();
      for(var i = 0; i < 15; i++) {
        $scope.expirationYears.push(thisYear + i);
      }
    }
    $scope.generateYears();

    $scope.generateMonths = function() {
      var thisMonth = new Date().getMonth() + 1;

      for(var i = 1; i <= 12; i++) {
        var month = "0" + i;

        if(i >= 10) {
          month = i;
        }

        if(i == thisMonth) {
          $scope.thisMonth = month;
        }

        $scope.expirationMonths.push(month);
      }
    }
    $scope.generateMonths();

    function getMerchantProvider(cardNo){                      //cardNo is the credit card number
      var cards = new Array();
      cards [0] = {cardName: "visa",prefixes: "4"};
      cards [1] = {cardName: "mastercard", prefixes: "51,52,53,54,55"};
      cards [2] = {cardName: "discover",  prefixes: "6011,650"};
      cards [3] = {cardName: "amex", prefixes: "34,37"};
      var prefix
        var cardType

        for(cardType=0; cardType<cards.length; cardType++){
          prefix = cards[cardType].prefixes.split(",");
          for (var i=0; i<prefix.length; i++) {
            var exp = new RegExp ("^" + prefix[i]);
            if (exp.test (cardNo))
              return cards[cardType].cardName;
          }
        }
      return -1;
    }

    $scope.modal = false;

    $scope.showModal = function(){
      console.log("test");
      $scope.modal = !$scope.modal; 
    };


    $scope.visa = true;
    $scope.mastercard = true;
    $scope.amex = true;
    $scope.discover = true;
    $scope.highlightMerchant = function(newValue, oldValue) {
      if(oldValue != newValue) {
        var merchant = getMerchantProvider(newValue);

        $scope.visa = false;
        $scope.mastercard = false;
        $scope.amex = false;
        $scope.discover = false;
        if(merchant != -1) {
          $scope[merchant] = true;
        }
      }
    }

    var highlightTimer = null;
    $scope.callbackDelay = 3000;  //milliseconds
    $scope.highlightChallenge = function(newValue, oldValue) {
      if($scope.paymentForm.$dirty == true && $scope.highlightNext == null) {
        $timeout.cancel(highlightTimer);

        var callback = function() {
          if(!$scope.errorMessage) {
            if($window.innerWidth > 768) {
              $scope.highlightNext = true;
            }
          }
        }

        var highlightTimer = $timeout(callback, $scope.callbackDelay);
      }
    }

    $scope.signout = function() {
      $auth.signOut().then(function (resp) {
        $scope.signedIn = false;
        $scope.payment.user.email = '';
        $scope.payment.user.verifyEmail = '';
      });
    }

    $scope.disableHighlightNext = function() {
      $scope.highlightNext = false;
    }

    $scope.$watch('payment.cardNumber', $scope.highlightMerchant);
    $scope.$watch('paymentForm.$valid', $scope.highlightChallenge);

    });


