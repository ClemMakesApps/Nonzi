'use strict';

angular.module('multiplyMe')
  .factory('api', function () {
    // Service logic
    // ...

    var url = 'https://104.131.176.248/api/v1/';

    // Public API here
    return url;
  });
