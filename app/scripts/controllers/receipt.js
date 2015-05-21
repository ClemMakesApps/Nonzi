'use strict';

angular.module('multiplyMe')
  .controller('ReceiptCtrl', function ($scope, $window, $location, $stateParams, $rootScope, Donation, $auth) {
    $rootScope.title = 'Thank you ' + Donation.name + ' for supporting the Bhatti Mines School';
    $rootScope.ogTitle = 'Contribute to the Bhatti Mines School Project';

    $scope.donorName = Donation.name;
    $scope.amount = Donation.donation.amount / 100;
    $scope.donated = !Donation.donation.is_challenged;
    $scope.recurring = Donation.donation.is_subscription;
    
    var pledgeText = 'Pledged money to support a free school in India. They lose pledge unless 3 of my friends donate in 3 days. Join me https://amala.multiplyme.in/#!/share/' + $stateParams.donationId;
    var donatedText = 'Donated money to support a free school in India. Join me and make a difference https://amala.multiplyme.in/#!/share/' + $stateParams.donationId + ' @AmalaFoundation';

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
          '//plus.google.com/share?url=https://amala.multiplyme.in/?_escaped_fragment_=share/' + $stateParams.donationId,
          'sharer', 'toolbar=0,status=0,width=500,height=500');
      }
      if(provider === 'email'){
        $window.open(
          'mailto:?body=https://amala.multiplyme.in/#!/share/' + $stateParams.donationId,
          'sharer', 'toolbar=0,status=0,width=500,height=500');
      }
    }
  });
