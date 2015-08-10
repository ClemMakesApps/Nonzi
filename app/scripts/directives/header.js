angular.module('multiplyMe').directive('mmHeader', function() {
  return {
    restrict: 'E',
    scope: {
      hasSignIn: '=hasSignIn',
      hasSignOut: '=hasSignOut'
    },
    templateUrl: 'views/header.html'
  };
});