'use strict';

describe('Service: UserDonation', function () {

  // load the service's module
  beforeEach(module('multiplyMeApp'));

  // instantiate service
  var UserDonation;
  beforeEach(inject(function (_UserDonation_) {
    UserDonation = _UserDonation_;
  }));

  it('should do something', function () {
    expect(!!UserDonation).toBe(true);
  });

});
