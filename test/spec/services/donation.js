'use strict';

describe('Service: Donation', function () {

  // load the service's module
  beforeEach(module('multiplyMe'));

  // instantiate service
  var Donation;
  beforeEach(inject(function (_Donation_) {
    Donation = _Donation_;
  }));

  it('should do something', function () {
    expect(!!Donation).toBe(true);
  });

});
