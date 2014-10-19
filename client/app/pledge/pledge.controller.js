'use strict';

angular.module('nonziApp')
  .controller('PledgeCtrl', ['$scope', '$location', 'Donation', function ($scope, $location, Donation) {
    console.log(Donation);

    $scope.confirmPledge = function() {
    	if($scope.pledgeAmount != null && $scope.name != null) {
	    	var pledge = {
	    		"downlineAmount":$scope.pledgeAmount,
	    		"amount":$scope.pledgeAmount,
	    		"user":$scope.name
	    	};

	    	Donation.save(pledge);
	    	$location.path("/report");
    	}
    }
}]);
