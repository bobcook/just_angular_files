describe('$url', function () {
  beforeEach(loadApp);

  beforeEach(inject(function($url) {
    this.$url = $url;
  }));

  describe('copyPathFrom', function () {
    it('copies the path from the source to destination', function () {
      const srcUrl = 'http://example.com/some/cool/path';
      const destUrl = 'http://other.example.com';
      const expectedUrl = 'http://other.example.com/some/cool/path';
      const result = this.$url.copyPathFrom(srcUrl, destUrl);

      expect(result).to.eq(expectedUrl);
    });
  });
});
