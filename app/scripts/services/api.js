'use strict';

angular.module('multiplyMe')
  .factory('api', function () {
    // Service logic
    // ...

    var url = 'https://api.multiplyme.in';

    // Public API here
    return url;
  });
