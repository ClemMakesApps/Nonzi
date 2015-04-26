'use strict';

describe('Service: name', function () {

  // load the service's module
  beforeEach(module('multiplyMeApp'));

  // instantiate service
  var name;
  beforeEach(inject(function (_name_) {
    name = _name_;
  }));

  it('should do something', function () {
    expect(!!name).toBe(true);
  });

});
