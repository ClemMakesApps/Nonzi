'use strict';

/**
* @ngdoc function
* @name multiplyMe.controller:ShareCtrl
* @description
* # ShareCtrl
* Controller of the multiplyMe
*/
angular.module('multiplyMe')
.controller('ShareCtrl', function ($scope, $rootScope, $stateParams, Donation, $location) {

  //Check flag
  var receiptYes = localStorage.getItem("receiptYes");
  
  //Clear
  localStorage.setItem("receiptYes", null);

  var donated = !Donation.donation.is_challenged;

  if(receiptYes == "true") {
    $scope.page = "receipt/" + $stateParams.donationId;
    $rootScope.title = 'Thank you ' + Donation.name + ' for supporting the Bhatti Mines School';
    $rootScope.ogTitle = 'Contribute to the Bhatti Mines School Project';

  } else {
    $scope.page = "sharedReceipt/" + $stateParams.donationId;
    $rootScope.title = 'Will you join ' + Donation.name + ' in supporting the Bhatti Mines School';
    $rootScope.ogTitle = $rootScope.title;
  }


    //Temp fix for iframe issue
    $location.path('/' + $scope.page);

  if(!donated) {
    $rootScope.description = 'I pledged money to support the Bhatti Mines School in India. They lose pledge unless 3 of my friends donate in 3 days. Join me!';
  } else {
    $rootScope.description = 'I donated money to support the Bhatti Mines School in India. Join me and make a difference';
  }

  $("#shareFrame").attr("src", "/#!/" + $scope.page);
});
