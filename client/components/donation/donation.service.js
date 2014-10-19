'use strict';

angular.module('nonziApp')
  .factory('Donation', ['$resource', 
    function($resource){
      return $resource('/api/donations/:id', { id: '@id'},
      {
        getArray: {
          method: 'GET',
          isArray: true
        }
      });
    }
  ]);

angular.module('nonziApp')
.factory('DonationLoader', ['$q', 'Donation', '$stateParams',
  function($q, Donation, $stateParams){
    return function(){
      console.log($stateParams);
      var delay = $q.defer();
      Donation.get({'id': $stateParams.id},
        function(donation){
          console.log('here');
          delay.resolve(donation);
        },function(){
          console.log('here1');
          delay.reject("Unable to retrieve donation");
        });
      return delay.promise;
    }
  }
]);
