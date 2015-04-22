'use strict';

angular.module('multiplyMe')
  .factory('userSubscription', function ($resource, api) {
    return $resource(api + 'user_subscription');
  });
