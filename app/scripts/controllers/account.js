'use strict';

/**
 * @ngdoc function
 * @name multiplyMe.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the multiplyMe
 */
angular.module('multiplyMe')
  .controller('AccountCtrl', function ($scope, $window, $location, $state, $rootScope, Donation, $auth, userSubscription, UserDonation, account, thank) {

    account.get({id: $auth.user.id}, function(result){
      $scope.personal_impact = result.personal_impact * .01;
      $scope.network_impact = result.network_impact * .01;
      $scope.total_impact = result.total_impact * .01;
      $scope.recurring_amount = result.recurring_amount;
      $scope.only_recurring = result.only_recurring;
      $scope.all_cancelled = result.all_cancelled;
      $scope.challengeCode = result.referral_code;
      $scope.canThank = result.can_thank;
      $scope.share_link = "https://" + $location.host() + "/#!/share/" + $scope.challengeCode;
      console.log(result);
      $scope.children = result.children;
      if(result.only_recurring && !result.all_cancelled){
        $scope.personal_impact /= 12;
      }
    });
    $scope.showShare = false;

    var donationId = "";
    UserDonation.get({id: $auth.user.id}, function(result){
      $scope.donation_ids = result.donation_ids;
      donationId = $scope.donation_ids[$scope.donation_ids.length - 1];

      if(donationId != null) {
        $scope.showShare = true;
      }
    });

    $rootScope.title = $auth.user.name + '\'s Donor Account - Back on My Feet Austin';
    $rootScope.ogTitle = 'MultiplyMe - Back on My Feet Austin';

    $scope.setRow = function(code){
     $scope.currentFriendCode = code;
    }

    $scope.thankFriend = function(){
      console.log($scope.message);
      console.log($scope.currentFriendCode);
      console.log($scope.name);
      thank.save({id: $scope.currentFriendCode, friend_name: $scope.name, content: $scope.message}, function(){
        $state.reload();
      });

      $scope.canThank = true;
    }

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

    var pledgeText = 'I just supported Back on My Feet. Learn more about what they are doing and how you can help! https://backonmyfeet.multiplyme.in/#!/share/' + donationId;
    var donatedText = 'I just supported Back on My Feet. Learn more about what they are doing and how you can help! https://backonmyfeet.multiplyme.in/#!/share/' + donationId + ' @BoMFAustin';

    $scope.share = function(provider){
      if(provider === 'facebook'){
        $window.open(
         '//www.facebook.com/sharer/sharer.php?u=https://backonmyfeet.multiplyme.in/?_escaped_fragment_=share/' + donationId,
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
          '//plus.google.com/share?url=https://backonmyfeet.multiplyme.in/?_escaped_fragment_=share/' + donationId,
          'sharer', 'toolbar=0,status=0,width=500,height=500');
      }
      if(provider === 'email'){
        $window.open(
          'mailto:?body=https://backonmyfeet.multiplyme.in/#!/share/' + donationId,
          'sharer', 'toolbar=0,status=0,width=500,height=500');
      }
    }

    function isIOS8() {
      var deviceAgent = navigator.userAgent.toLowerCase();
      return /(iphone|ipod|ipad).* os 8_/.test(deviceAgent);
    }

    function isIOS7() {
      var deviceAgent = navigator.userAgent.toLowerCase();
      return /(iphone|ipod|ipad).* os 7_/.test(deviceAgent);
    }

    $scope.operand = '?';

    if(isIOS8()) {
      $scope.operand = '&';
    } else if(isIOS7()) {
      $scope.operand = ';';
    }
	
  });
