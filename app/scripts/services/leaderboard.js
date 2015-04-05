'use strict';

angular.module('multiplyMe')
  .factory('Leaderboard', function ($resource, URL) {
    return $resource(URL + 'v1/leaders/:limit', {limit: '@limit'} );
  })
  .factory('LeaderboardLoader', function($q, Leaderboard){
    return function(limit){
      var delay = $q.defer();
      Leaderboard.get({limit: limit},
      function(leaders){
        delay.resolve(leaders)
      },function(){
        delay.reject("Unable to retrieve donation")
      });
      return delay.promise;
    }
  });
