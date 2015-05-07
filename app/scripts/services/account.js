'use strict';

angular.module('multiplyMe')
  .factory('account', function ($resource, api) {
    return $resource(api + 'accounts/:id', {id: '@id'} );
  });
