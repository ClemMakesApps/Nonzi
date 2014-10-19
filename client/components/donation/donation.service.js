'use strict';

angular.module('nonziApp')
  .factory('Donation', ['$resource', 
    function($resource){
      return $resource('/api/donations/:id', { id: '@_id'},
      {
        getArray: {
          method: 'GET',
          isArray: true
        }
      });
    }
  ]);

angular.module('nonziApp')
.factory('DonationLoader', ['$q', 'Donation',
  function($q, Donation){
    return function(){
      console.log(Donation);
      var delay = $q.defer();
      Donation.getArray(null,
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
