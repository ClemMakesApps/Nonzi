angular.module('multiplyMe').directive('mmSteps', function() {
  return {
    restrict: 'E',
    scope: {
      active: '=active'
    },
    templateUrl: 'views/steps.html'
  };
});