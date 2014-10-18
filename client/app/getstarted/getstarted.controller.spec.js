'use strict';

describe('Controller: GetstartedCtrl', function () {

  // load the controller's module
  beforeEach(module('nonziApp'));
  beforeEach(module('socketMock'));

  var GetstartedCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    scope = $rootScope.$new();
    GetstartedCtrl = $controller('GetstartedCtrl', {
      $scope: scope
    });
  }));

});
