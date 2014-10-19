'use strict';

angular.module('nonziApp')
  .controller('PledgeCtrl', ['$scope', '$location', '$anchorScroll', 'Donation', function ($scope, $location, $anchorScroll, Donation) {
	var today = new Date();
	today.setDate(today.getDate() + 3);
	$scope.expiration = today;

    $scope.confirmPledge = function() {
    	if($scope.pledgeAmount != null && $scope.name != null) {
	    	var pledge = {
	    		"downlineAmount":$scope.pledgeAmount,
	    		"amount":$scope.pledgeAmount,
	    		"user":$scope.name,
	    		"createdAt": new Date()
	    	};

	    	Donation.save(pledge).$promise.then(function(result) {
	    		console.log(result);
		        $anchorScroll(0);
		    	$location.path("/report/" + result._id);
	    	});
    	}
    }
}]);
