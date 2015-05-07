'use strict';

angular.module('multiplyMe')
  .factory('name', function ($resource, api) {
    return $resource(api + 'names/:id', {id: '@id'} );
  });
