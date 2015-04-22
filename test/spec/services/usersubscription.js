'use strict';

describe('Service: userSubscription', function () {

  // load the service's module
  beforeEach(module('multiplyMeApp'));

  // instantiate service
  var userSubscription;
  beforeEach(inject(function (_userSubscription_) {
    userSubscription = _userSubscription_;
  }));

  it('should do something', function () {
    expect(!!userSubscription).toBe(true);
  });

});
