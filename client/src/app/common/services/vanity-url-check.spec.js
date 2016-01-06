describe('$vanityUrlCheck', function () {
  beforeEach(loadApp);

  let $vanityUrlCheck;

  beforeEach(inject(function (_$vanityUrlCheck_) {
    $vanityUrlCheck = _$vanityUrlCheck_;
  }));

  describe('.isVanityUrl', function () {
    it('is true when passed a vanity url', function () {
      const vanityUrl = 'http://mystayingsharp.org';
      const result = $vanityUrlCheck.isVanityUrl(vanityUrl);

      expect(result).to.eq(true);
    });

    it('is false when not passed a vanity url', function () {
      const nonVanityUrl = 'www.example.com';
      const result = $vanityUrlCheck.isVanityUrl(nonVanityUrl);

      expect(result).to.eq(false);
    });

    it('is false when passed a string starting with a vanity URL', function () {
      const nonVanityUrl = 'http://mystayingsharp.org/hamburgers';
      const result = $vanityUrlCheck.isVanityUrl(nonVanityUrl);

      expect(result).to.eq(false);
    });
  });

  describe('.isVanityDomain', function () {
    it('is true when passed the home URL of the vanity domain', function () {
      const vanityDomainUrl = 'https://mystayingsharp.org';
      const result = $vanityUrlCheck.isVanityDomain(vanityDomainUrl);

      expect(result).to.eq(true);
    });

    it('is true when passed a non-home URL in a vanity domain', function () {
      const vanityDomainUrl = 'https://mystayingsharp.org/games';
      const result = $vanityUrlCheck.isVanityDomain(vanityDomainUrl);

      expect(result).to.eq(true);
    });

    it('is false otherwise', function () {
      const nonVanityDomainUrl = 'http://www.example.com';
      const result = $vanityUrlCheck.isVanityDomain(nonVanityDomainUrl);

      expect(result).to.eq(false);
    });
  });

  describe('.redirectUrlFor', function () {
    const hasPromoCode = function (url, promoCode) {
      return _.endsWith(url, `promo=${promoCode}`);
    };

    it('has the SS-EMPLOYEE promo code for /employee', function () {
      const currentUrl = 'http://example.com/employee'
      const result = $vanityUrlCheck.redirectUrlFor(currentUrl);

      expect(hasPromoCode(result, 'SS-EMPLOYEE')).to.eq(true);
    });

    it('has the SS-EMPLOYEE promo code for /employees', function () {
      const currentUrl = 'http://example.com/employees'
      const result = $vanityUrlCheck.redirectUrlFor(currentUrl);

      expect(hasPromoCode(result, 'SS-EMPLOYEE')).to.eq(true);
    });

    it('has the SS-BETA promo code for /ssmember', function () {
      const currentUrl = 'http://example.com/ssmember'
      const result = $vanityUrlCheck.redirectUrlFor(currentUrl);

      expect(hasPromoCode(result, 'SS-BETA')).to.eq(true);
    });

    it('has the SS-BETA promo code for /ssmembers', function () {
      const currentUrl = 'http://example.com/ssmembers'
      const result = $vanityUrlCheck.redirectUrlFor(currentUrl);

      expect(hasPromoCode(result, 'SS-BETA')).to.eq(true);
    });

    it('has the SM-SS promo code for all other URLs', function () {
      const currentUrl = 'http://example.com/foobar'
      const result = $vanityUrlCheck.redirectUrlFor(currentUrl);

      expect(hasPromoCode(result, 'SM-SS')).to.eq(true);
    });
  });
});
