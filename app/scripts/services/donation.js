'use strict';

/**
 * @ngdoc service
 * @name appApp.Donation
 * @description
 * # Donation
 * Factory in the appApp.
 */
angular.module('appApp')
  .factory('Donation', ['$resource','URL',function ($resource,URL) {
    return $resource(URL + '/api/donations/:id');
    }
    ]);
