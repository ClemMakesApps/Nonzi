'use strict';

/**
 * @ngdoc function
 * @name multiplyMe.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the multiplyMe
 */
angular.module('multiplyMe')
  .controller('AccountCtrl', function ($scope, $window, $location, $state, $rootScope, Donation, $auth, userSubscription) {
    $rootScope.title = $auth.user.name + '\'s Donor Account - Bhatti Mines School';
    $scope.deleteSubscriptions = function(){
      if(window.confirm('You sure?')){
        var result = userSubscription.delete();
        $state.reload();
      }
    }

    $scope.personal_impact = $auth.user.personal_impact * .001;
    $scope.network_impact = $auth.user.network_impact * .001;
    $scope.recurring_amount = $auth.user.recurring_amount * .001;
    $scope.name = $auth.user.name;
    $scope.id = $auth.user.id;
    $scope.share_link = "https://" + $location.host() + "/#/share/" + $scope.id;

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
