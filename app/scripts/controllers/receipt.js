'use strict';

angular.module('multiplyMe')
  .controller('ReceiptCtrl', function ($scope, $window, $location, $stateParams, $rootScope, Donation, $auth) {
    $rootScope.title = 'Thank you ' + Donation.name + ' for supporting the Bhatti Mines School';

    $scope.donorName = Donation.name;
    $scope.amount = Donation.donation.amount / 100;
    $scope.share = function(provider){
      if(provider === 'facebook'){
        $window.open(
         '//www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent($location.absUrl()),
         'sharer', 'toolbar=0,status=0,width=500,height=500');
      }
      if(provider === 'twitter'){
        $window.open(
          '//www.twitter.com/intent/tweet?text=Pledged money to support a free school in India. They lose pledge unless 3 of my friends donate in 3 days. Join me ' + encodeURIComponent($location.absUrl()),
          'sharer', 'toolbar=0,status=0,width=500,height=500');
      }
      if(provider === 'google'){
        $window.open(
          '//plus.google.com/share?url=' + encodeURIComponent($location.absUrl()),
          'sharer', 'toolbar=0,status=0,width=500,height=500');
      }
      if(provider === 'email'){
        $window.open(
          'mailto:?body=' + encodeURIComponent($location.absUrl()),
          'sharer', 'toolbar=0,status=0,width=500,height=500');
      }
    }
  });
