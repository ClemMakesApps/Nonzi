'use strict';

angular.module('multiplyMe')
  .factory('organization', function ($resource, api) {
    return $resource(api + 'organizations/:id', {id: '@id'} );
  });
