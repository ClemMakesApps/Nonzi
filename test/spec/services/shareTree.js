'use strict';

describe('Service: shareTree', function () {

  // load the service's module
  beforeEach(module('multiplyMeApp'));

  // instantiate service
  var shareTree;
  beforeEach(inject(function (_shareTree_) {
    shareTree = _shareTree_;
  }));

  it('should do something', function () {
    expect(!!shareTree).toBe(true);
  });

});
