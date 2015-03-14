'use strict';

/**
 * @ngdoc service
 * @name multiplyMe.Donation
 * @description
 * # Donation
 * Factory in the multiplyMe
 */
angular.module('multiplyMe')
  .factory('Donation', ['$resource', 'URL', function ($resource, URL) {
    return $resource(URL + '/api/donations/:id');
    }]
  );
