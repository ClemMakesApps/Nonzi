'use strict';

/**
 * @ngdoc function
 * @name multiplyMe.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the multiplyMe
 */
angular.module('multiplyMe')
  .controller('AccountCtrl', function ($scope, $window, $location, $state, $rootScope, Donation, $auth, userSubscription, UserDonation, account) {

    account.get({id: $auth.user.id}, function(result){
      $scope.personal_impact = result.personal_impact * .01;
      $scope.network_impact = result.network_impact * .01;
      $scope.total_impact = result.total_impact * .01;
      $scope.recurring_amount = result.recurring_amount;
      $scope.only_recurring = result.only_recurring;
      $scope.all_cancelled = result.all_cancelled;
      console.log(result);
      if(result.only_recurring){
        $scope.personal_impact /= 12;
      }
    });

    var donationId = "";
    UserDonation.get({id: $auth.user.id}, function(result){
      $scope.donation_ids = result.donation_ids;
      donationId = $scope.donation_ids[$scope.donation_ids.length - 1];
      $scope.share_link = "https://" + $location.host() + "/#!/share/" + donationId;
    });

    $rootScope.title = $auth.user.name + '\'s Donor Account - Bhatti Mines School';
    $rootScope.ogTitle = 'MultiplyMe - Bhatti Mines School Project';

    $scope.deleteSubscriptions = function(){
      if(window.confirm('You sure?')){
        var result = userSubscription.delete()
        .$promise.then(
          function() {
            document.location.reload(true);
          });
      }
    }

    $scope.personal_impact = $auth.user.personal_impact * .01;
    $scope.network_impact = $auth.user.network_impact * .01;
    $scope.recurring_amount = $auth.user.recurring_amount * .01;
    $scope.name = $auth.user.name;

    // Donation ID is hard coded right now
    //Email hard coded
    $scope.updatePassword = function(){
      $auth.submitLogin({
        email: $auth.user.email,
        password: $scope.oldPassword
      }).then( function (data){
        $auth.updatePassword({
          password: $scope.newPassword,
          password_confirmation: $scope.confirmPassword
        }).then( function (data) {
          alert("Password updated successfully");
          $scope.oldPassword = "";
          $scope.newPassword = "";
          $scope.confirmPassword = "";
        })
      });
    }

    $scope.logout = function(){
      $auth.signOut().then( function (resp){
        $state.go('signin');
      });
    }

    var pledgeText = 'Pledged money to support a free school in India. They lose pledge unless 3 of my friends donate in 3 days. Join me https://amala.multiplyme.in/#!/share/' + donationId;
    var donatedText = 'Donated money to support a free school in India. Join me and make a difference https://amala.multiplyme.in/#!/share/' + donationId + ' @AmalaFoundation';

    $scope.share = function(provider){
      if(provider === 'facebook'){
        $window.open(
         '//www.facebook.com/sharer/sharer.php?u=https://amala.multiplyme.in/?_escaped_fragment_=share/' + donationId,
         'sharer', 'toolbar=0,status=0,width=500,height=500');
      }
      if(provider === 'twitter'){

        var message = pledgeText;
        if($scope.donated) {
          message = donatedText;
        }

        $window.open(
          '//www.twitter.com/intent/tweet?text=' + message,
          'sharer', 'toolbar=0,status=0,width=500,height=500');
      }
      if(provider === 'google'){
        $window.open(
          '//plus.google.com/share?url=https://amala.multiplyme.in/?_escaped_fragment_=share/' + donationId,
          'sharer', 'toolbar=0,status=0,width=500,height=500');
      }
      if(provider === 'email'){
        $window.open(
          'mailto:?body=https://amala.multiplyme.in/#!/share/' + donationId,
          'sharer', 'toolbar=0,status=0,width=500,height=500');
      }
    }
	
  });
