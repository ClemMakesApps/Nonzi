'use strict';

/**
* @ngdoc function
* @name multiplyMe.controller:ShareCtrl
* @description
* # ShareCtrl
* Controller of the multiplyMe
*/
angular.module('multiplyMe')
.controller('ShareCtrl', function ($scope, $rootScope, $stateParams, Donation) {

  //Check flag
  var receiptYes = localStorage.getItem("receiptYes");
  
  //Clear
  localStorage.setItem("receiptYes", null);

  if(receiptYes == "true") {
    $scope.page = "receipt/" + $stateParams.donationId;
    $rootScope.title = 'Thank you ' + Donation.name + ' for supporting the Bhatti Mines School';
  } else {
    $scope.page = "sharedReceipt/" + $stateParams.donationId;
    $rootScope.title = 'Will you join ' + Donation.name + ' in supporting the Bhatti Mines School';
  }

  $("#shareFrame").attr("src", "/#/" + $scope.page);
});
