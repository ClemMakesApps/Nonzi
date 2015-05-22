'use strict';

describe('Service: emailSubscribe', function () {

  // load the service's module
  beforeEach(module('multiplyMeApp'));

  // instantiate service
  var emailSubscribe;
  beforeEach(inject(function (_emailSubscribe_) {
    emailSubscribe = _emailSubscribe_;
  }));

  it('should do something', function () {
    expect(!!emailSubscribe).toBe(true);
  });

});
