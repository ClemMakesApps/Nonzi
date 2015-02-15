'use strict';

describe('Controller: PledgeCtrl', function () {

  // load the controller's module
  beforeEach(module('nonziApp'));

  var PledgeCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PledgeCtrl = $controller('PledgeCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
