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
    $rootScope.title = 'Thank you ' + Donation.name + ' for supporting Back on My Feet Austin';
    $rootScope.ogTitle = 'Contribute to Back on My Feet Austin';

  } else {
    $scope.page = "sharedReceipt/" + $stateParams.donationId;
    $rootScope.title = 'Will you join ' + Donation.name + ' in supporting Back on My Feet Austin';
    $rootScope.ogTitle = $rootScope.title;
  }


    //Temp fix for iframe issue
    $location.path('/' + $scope.page);

  if(!donated) {
    $rootScope.description = 'I pledged money to support Back on My Feet Austin. They lose pledge unless 3 of my friends donate in 3 days. Join me!';
  } else {
    $rootScope.description = 'I donated money to support Back on My Feet Austin. Join me and make a difference';
  }

  $("#shareFrame").attr("src", "/#!/" + $scope.page);
});
