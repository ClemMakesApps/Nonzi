'use strict';

angular.module('multiplyMe')
  .factory('reminder', function ($resource, api) {
    return $resource(api + 'donation_reminders', {id: '@id', organization_id: 2} );
  });
