describe('$userStatusRedirectCheck', function () {
  beforeEach(loadApp);

  let $userStatusRedirectCheck;
  let $state;
  let $rootScope;
  let $location;

  beforeEach(inject(function (_$userStatusRedirectCheck_,  _$rootScope_, _$location_, _$state_) {
    $userStatusRedirectCheck = _$userStatusRedirectCheck_;
    $state = _$state_;
    $rootScope = _$rootScope_;
    $location = _$location_;
  }));

  describe('.shouldRedirectUnpaid', function () {
    it('should not redirect for paid users', function () {
      $rootScope.$currentUser = { isPaid: true };
      $location.path('/');
      const result = $userStatusRedirectCheck.shouldRedirectUnpaid();

      expect(result).to.eq(false);
    });

    it('should redirect for unpaid users not on unpaid url', function () {
      $rootScope.$currentUser = { isPaid: false };
      $location.path('/');
      const result = $userStatusRedirectCheck.shouldRedirectUnpaid();

      expect(result).to.eq(true);
    });

    it('should not redirect for unpaid users on unpaid url', function () {
      $rootScope.$currentUser = { isPaid: false };
      $location.path('/see-you-in-march');
      const result = $userStatusRedirectCheck.shouldRedirectUnpaid();

      expect(result).to.eq(false);
    });
  });

  describe('.redirectUnpaid', function () {
    it('should redirect to the unpaid url', function () {
      const targetUrl = '/see-you-in-march';
      $location.path('/');

      expect($location.path()).to.eq('/');

      $userStatusRedirectCheck.redirectUnpaid();

      expect($location.path()).to.eq(targetUrl);
    });
  });
});

