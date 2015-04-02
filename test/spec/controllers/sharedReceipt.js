'use strict';

describe('Controller: SharedreceiptCtrl', function () {

  // load the controller's module
  beforeEach(module('multiplyMeApp'));

  var SharedreceiptCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SharedreceiptCtrl = $controller('SharedreceiptCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
