'use strict';

describe('Service: Parties', function () {

  // load the service's module
  beforeEach(module('mbMapApp'));

  // instantiate service
  var Parties;
  beforeEach(inject(function (_Parties_) {
    Parties = _Parties_;
  }));

  it('should do something', function () {
    expect(!!Parties).toBe(true);
  });

});
