'use strict';

angular.module('multiplyMe')
  .controller('ReceiptCtrl', function ($scope, $window, $location, $stateParams, Donation, $auth) {
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
