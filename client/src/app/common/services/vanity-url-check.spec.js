describe('$vanityUrlCheck', function () {
  beforeEach(loadApp);

  beforeEach(inject(function ($vanityUrlCheck) {
    this.$vanityUrlCheck = $vanityUrlCheck;
  }));

  describe('.isVanityUrl', function () {
    it('is true when passed a vanity url', function () {
      const vanityUrl = 'http://mystayingsharp.org';
      const result = this.$vanityUrlCheck.isVanityUrl(vanityUrl);

      expect(result).to.eq(true);
    });

    it('is false when not passed a vanity url', function () {
      const nonVanityUrl = 'www.example.com';
      const result = this.$vanityUrlCheck.isVanityUrl(nonVanityUrl);

      expect(result).to.eq(false);
    });

    it('is false when passed a string starting with a vanity URL', function () {
      const nonVanityUrl = 'http://mystayingsharp.org/hamburgers';
      const result = this.$vanityUrlCheck.isVanityUrl(nonVanityUrl);

      expect(result).to.eq(false);
    });
  });
});
