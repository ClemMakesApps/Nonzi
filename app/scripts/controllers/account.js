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
      if(result.only_recurring){
        $scope.personal_impact /= 12;
      }
    });
    UserDonation.get({id: $auth.user.id}, function(result){
      $scope.donation_ids = result.donation_ids;
      $scope.share_link = "https://" + $location.host() + "/#!/share/" + $scope.donation_ids[$scope.donation_ids.length - 1];
    });

    $rootScope.title = $auth.user.name + '\'s Donor Account - Bhatti Mines School';
    $rootScope.ogTitle = 'MultiplyMe - Bhatti Mines School Project';

    $scope.deleteSubscriptions = function(){
      if(window.confirm('You sure?')){
        var result = userSubscription.delete();
        $state.reload();
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
        email: "frasermince@gmail.com",
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

	
	
    $scope.share = function(provider){
      if(provider === 'facebook'){
        $window.open(
         '//www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent($location.absUrl()),
         'sharer', 'toolbar=0,status=0,width=500,height=500');
      }
      if(provider === 'twitter'){
        $window.open(
          '//www.twitter.com/intent/tweet?url=' + encodeURIComponent($location.absUrl()),
          'sharer', 'toolbar=0,status=0,width=500,height=500');
      }
      if(provider === 'google'){
        $window.open(
          '//plus.google.com/share?url=' + encodeURIComponent($location.absUrl()),
          'sharer', 'toolbar=0,status=0,width=500,height=500');
      }
      if(provider === 'email'){
        // $window.open(
        //   '//plus.google.com/share?url=' + encodeURIComponent($location.absUrl()),
        //   'sharer', 'toolbar=0,status=0,width=500,height=500');
      }
    }
	
  });
