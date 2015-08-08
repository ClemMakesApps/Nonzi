'use strict';

angular.module('multiplyMe')
  .controller('ReceiptCtrl', function ($scope, $window, $location, $stateParams, $rootScope, Donation, $auth) {
    $rootScope.title = 'Thank you ' + Donation.name + ' for supporting the Back on My Feet Austin';
    $rootScope.ogTitle = 'Contribute to Back on My Feet Austin';

    $scope.donorName = Donation.name;
    $scope.firstName = Donation.name.split(' ')[0]
    $scope.amount = Donation.donation.amount / 100;
    console.log(Donation);
<<<<<<< HEAD
    $scope.donationId = Donation.donation.id
    $scope.shareId = $stateParams.donationId;
=======
    $scope.donationId = Donation.donation.referral_code;
>>>>>>> origin/development
    $scope.donated = !Donation.donation.is_challenged;
    $scope.recurring = Donation.donation.is_subscription;
    $scope.parentId = Donation.donation.parent_id;
    $scope.children = Donation.parents_children_count;
    $scope.parentDonation = Donation.parent_donation;
    if(Donation.parent_time_remaining != null){
      $scope.timeRemaining = Donation.parent_time_remaining;
    }
    if(Donation.parent_name != null){
      $scope.parentFirstName = Donation.parent_name.split(' ')[0];
    }
    
    var pledgeText = 'I just supported Back on My Feet. Learn more about what they are doing and how you can help! https://backonmyfeet.multiplyme.in/#!/share/' + $stateParams.donationId;
    var donatedText = 'I just supported Back on My Feet. Learn more about what they are doing and how you can help! https://backonmyfeet.multiplyme.in/#!/share/' + $stateParams.donationId + ' @BoMFAustin';

    $scope.share = function(provider){
      if(provider === 'facebook'){
        $window.open(
         '//www.facebook.com/sharer/sharer.php?u=https://backonmyfeet.multiplyme.in/?_escaped_fragment_=share/' + $stateParams.donationId,
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
          '//plus.google.com/share?url=https://backonmyfeet.multiplyme.in/?_escaped_fragment_=share/' + $stateParams.donationId,
          'sharer', 'toolbar=0,status=0,width=500,height=500');
      }
      if(provider === 'email'){
        $window.open(
          'mailto:?body=https://backonmyfeet.multiplyme.in/#!/share/' + $stateParams.donationId,
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
