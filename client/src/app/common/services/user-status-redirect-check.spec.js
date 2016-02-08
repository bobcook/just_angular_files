describe('$userStatusRedirectCheck', function () {
  beforeEach(loadApp);

  let $userStatusRedirectCheck;
  let $location;

  beforeEach(inject(function (_$userStatusRedirectCheck_, _$location_) {
    $userStatusRedirectCheck = _$userStatusRedirectCheck_;
    $location = _$location_;
  }));

  describe('.redirectUnpaid', function () {
    xit('should redirect to the unpaid url', function () {
      const targetUrl = '/see-you-in-march';
      $location.path('/');

      expect($location.path()).to.eq('/');

      $userStatusRedirectCheck.redirectUnpaid();

      expect($location.path()).to.eq(targetUrl);
    });
  });
});

