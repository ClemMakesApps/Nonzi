'use strict';

angular.module('multiplyMe')
  .factory('UserDonation', function ($resource, api) {
    return $resource(api + 'user_donations/:id', {id: '@id', organization_id: 2} );
  });
