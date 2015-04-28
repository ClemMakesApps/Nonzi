'use strict';

/**
* @ngdoc function
* @name multiplyMe.controller:ShareCtrl
* @description
* # ShareCtrl
* Controller of the multiplyMe
*/
angular.module('multiplyMe')
.controller('ShareCtrl', function ($scope, $stateParams) {

  //Check flag
  var receiptYes = localStorage.getItem("receiptYes");
  
  //Clear
  localStorage.setItem("receiptYes", null);

  if(receiptYes == "true") {
    $scope.page = "receipt/" + $stateParams.donationId;
  } else {
    $scope.page = "sharedReceipt/" + $stateParams.donationId;
  }

  $("#shareFrame").attr("src", "/#/" + $scope.page);
});
