'use strict';

angular.module('multiplyMe')
  .factory('api', function () {
    // Service logic
    // ...

    var url = 'http://104.236.212.96/api/v1/';

    // Public API here
    return url;
  });
