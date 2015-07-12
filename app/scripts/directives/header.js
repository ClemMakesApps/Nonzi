angular.module('multiplyMe').directive('mmHeader', function() {
  return {
    restrict: 'E',
    scope: {
      hasSignIn: '=hasSignIn'
    },
    templateUrl: 'views/header.html'
  };
});