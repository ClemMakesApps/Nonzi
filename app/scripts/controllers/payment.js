'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:DonationCtrl
 * @description
 * # DonationCtrl
 * Controller of the appApp
 */
angular.module('multiplyMe')
  .controller('PaymentCtrl', function ($scope, $auth, $timeout, Donation, $q, $stateParams, $state) {
    $scope.amount = $stateParams.amount;
    $scope.isSubscription == $stateParams.isSubscription == "true";

    var validateFormSubmission = function(){
      var payment = $scope.payment;
      return payment.user.name
        && payment.cardNumber
        && payment.expirationYear
        && payment.expirationMonth
        && payment.cvc
        && payment.zip
        && payment.user.email
        && payment.user.verifyEmail
        && $scope.password;
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
      var payment = $scope.payment;
      createToken(
        payment.cardNumber,
        payment.expirationMonth,
        payment.expirationYear,
        payment.cvc)
        .then(function(token){
          Donation.save({
            donation: {
              amount: Math.floor($stateParams.amount * 100),
              organization_id: 1,
              is_subscription: $scope.isSubscription
            },
            card: {
              token: token,
              email: payment.user.email
            }
          },
          function(result){
            $state.go('receipt', {donationId: result.donation.id});
          });
        });
    }

    $scope.submit = function(){
      $scope.enableLoading = true;
      $scope.challengeProgress = "Initating";

      if(validateFormSubmission()){
        $scope.enableLoading = true;
        $scope.challengeProgress = "Initating";

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
            logInUser();
            $scope.challengeProgress = "Processing";
          })
      }
     else{
      console.log('somethin wrong');
     }
    };

    $scope.payment = {}
    $scope.payment.user = {}

    $scope.expirationYears = [];
    $scope.expirationMonths = [];

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

    $scope.register = function(){
      $auth.submitRegistration($scope.payment.user)
      .then(function(resp){
        $state.go('/account');
      })
    }

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

    $scope.highlightChallenge = function(newValue, oldValue) {
      if(oldValue != null) {
        $scope.highlightNext = true;
      }
    }

    $scope.donate = function() {
      var btn = angular.element(document.querySelector( '.btn-donate' ));
      btn.text("Donating...");

      $scope.donating = true;
    }

    // var formCheckTimer = null;
    // $scope.checkForm = function(newValue, oldValue) {
    //   if(newValue != oldValue) {
    //       $timeout.cancel(formCheckTimer);
    //       var formCheckTimer = $timeout(function() {
    //       }, 3000);
    //     }
    //   }
    // }
    $scope.$watch('payment.cardNumber', $scope.highlightMerchant);
    $scope.$watch('password', $scope.highlightChallenge);

  });
