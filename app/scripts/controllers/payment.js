'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:DonationCtrl
 * @description
 * # DonationCtrl
 * Controller of the appApp
 */
angular.module('multiplyMe')
  .controller('PaymentCtrl', function ($rootScope, $scope, $auth, $timeout, Donation, $q, $stateParams, $state) {
    $rootScope.$on('auth:validation-success', function(ev, user) {
      $scope.signedIn = true;
    });
    $rootScope.$on('auth:validation-error', function(ev) {
      $scope.signedIn = false;
    });

    $scope.signedIn = $auth.user.signedIn;
    $scope.amount = $stateParams.amount;
    $scope.isSubscription == $stateParams.isSubscription == "true";
    $scope.authUser = {
      'name': $auth.user.name,
      'email': $auth.user.email
    };

    $scope.payment = {}
    $scope.payment.user = {
      'name': $scope.authUser.name,
      'email': $scope.authUser.email,
      'verifyEmail': $scope.authUser.email
    }

    $scope.expirationYears = [];
    $scope.expirationMonths = [];
    $scope.referralName = "John Appleseed";
    $scope.hasReferral = Boolean($stateParams.refer);

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
      Stripe.setPublishableKey('pk_test_6cMTIQe6u51NWrawrcifDDkJ');
      Stripe.card.createToken({
        number: number,
        exp_month: exp_month,
        exp_year: exp_year,
        cvc: cvc
      },
      function(status, response){
        deferred.resolve(response.id);
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
      });
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
              parent_id: referrer,
              organization_id: 1
            },
            card: {
              token: token,
              email: email
            }
          },
          function(result){
            $state.go('receipt', {donationId: result.donation.id});
          });
        });
    }

    $scope.challengeSubmit = function(){
      $scope.isChallenged = true;
      submit();
    }
    $scope.unchallengedSubmit = function(){
      $scope.isChallenged = false;
      $scope.donateStatus = "Donating...";
      $scope.donating = true;
      submit();
    }


    var submit = function(){
      $timeout.cancel(highlightTimer);

      if(validateFormSubmission()){
        if(!$scope.donating) {
          $scope.enableLoading = true;
          $scope.challengeProgress = "Initating";
        }
        if(!$scope.signedIn){

          var payment = $scope.payment;
          $auth.submitRegistration(
              {
                email: payment.user.email,
                password: $scope.password,
                password_confirmation: $scope.password,
                name: payment.user.name
              }
              )
            .then(function(result){
              if(!$scope.donating) {
                $scope.challengeProgress = "Processing";
              }
              logInUser();
            })
          .catch(function(response){
            $scope.enableLoading = false;
            var errors = response.data.errors;
            $scope.donating = false;
            $scope.errorMessage = errors.full_messages[0];
            $scope.highlightNext = false;
          });
        }
        else{
          if(!$scope.donating) {
            $scope.challengeProgress = "Processing";
          }
          createDonation();
        }
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
          $scope.highlightNext = true;
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
