'use strict';

/**
 * @ngdoc service
 * @name multiplyMe.ShareTree
 * @description
 * # ShareTree
 * Factory in the multiplyMe
 */
angular.module('multiplyMe')
  .factory('ShareTree', function ($resource, api) {
    return $resource(api + 'share_trees/:id', {id: '@id'} );
  });

angular.module('multiplyMe')
  .factory('ShareTreeLoader', function($q, ShareTree){
    return function(id){
      var delay = $q.defer();
      ShareTree.get({id: id},
      function(shareTree){
        delay.resolve(shareTree)
      },function(){
        delay.reject("Unable to retrieve shareTree")
      });
      return delay.promise;
    }
  });
