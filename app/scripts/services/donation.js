'use strict';

/**
 * @ngdoc service
 * @name multiplyMe.Donation
 * @description
 * # Donation
 * Factory in the multiplyMe
 */
angular.module('multiplyMe')
  .factory('Donation', function ($resource, api) {
    return $resource(api + 'donations/:id', {id: '@id'} );
  });

angular.module('multiplyMe')
  .factory('DonationLoader', function($q, Donation){
    return function(id){
      var delay = $q.defer();
      Donation.get({id: id},
      function(donation){
        delay.resolve(donation)
      },function(){
        delay.reject("Unable to retrieve donation")
      });
      return delay.promise;
    }
  });
