'use strict';

angular.module('multiplyMe')
  .service('EmailSubscribe', function Emailsubscribe($resource, api) {
    return $resource(api + 'email_subscriptions');
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
