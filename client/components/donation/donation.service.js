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
