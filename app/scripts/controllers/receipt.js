'use strict';

angular.module('multiplyMe')
  .controller('ReceiptCtrl', function ($scope, $window, $location, $stateParams, $rootScope, Donation, $auth) {
    $rootScope.title = 'Thank you ' + Donation.name + ' for supporting the Back on My Feet Austin';
    $rootScope.ogTitle = 'Contribute to Back on My Feet Austin';

    $scope.donorName = Donation.name;
    $scope.firstName = Donation.name.split(' ')[0]
    $scope.amount = Donation.donation.amount / 100;
    console.log(Donation);
    $scope.donationId = Donation.donation.id
    $scope.donated = !Donation.donation.is_challenged;
    $scope.recurring = Donation.donation.is_subscription;
    $scope.parentId = Donation.donation.parent_id;
    
    var pledgeText = 'Pledged money to support a free school in India. They lose pledge unless 3 of my friends donate in 3 days. Join me https://backonmyfeet.multiplyme.in/#!/share/' + $stateParams.donationId;
    var donatedText = 'Donated money to support a free school in India. Join me and make a difference https://backonmyfeet.multiplyme.in/#!/share/' + $stateParams.donationId + ' @AmalaFoundation';

    $scope.share = function(provider){
      if(provider === 'facebook'){
        $window.open(
         '//www.facebook.com/sharer/sharer.php?u=https://amala.multiplyme.in/?_escaped_fragment_=share/' + $stateParams.donationId,
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
  });
