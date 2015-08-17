'use strict';

angular.module('multiplyMe')
  .factory('thank', function ($resource, api) {
    return $resource(api + 'thanks', {id: '@id', friend_name: '@friend_name', content: '@content'} );
  });
