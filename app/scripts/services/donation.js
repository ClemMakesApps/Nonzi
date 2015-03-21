'use strict';

/**
 * @ngdoc service
 * @name multiplyMe.Donation
 * @description
 * # Donation
 * Factory in the multiplyMe
 */
angular.module('multiplyMe')
  .factory('Donation', ['$resource', 'api', function ($resource, api) {
    return $resource(api + 'donations/:id');
    }]
  );
