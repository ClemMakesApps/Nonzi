'use strict';

angular.module('multiplyMe')
  .factory('api', function () {
    // Service logic
    // ...

    var url = 'https://api.multiplyme.in/v1/';

    // Public API here
    return url;
  });
