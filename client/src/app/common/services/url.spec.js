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

  describe('makeUrl', function () {
    context('on IE', function () {
      const elementFn = function (href) {
        const split = href.split('.com');
        const host = split[0].split('http://')[1] + '.com';
        const pathname = split[1].slice(1); // missing leading '/'

        return {
          host: host,
          pathname: pathname,
        };
      };

      describe('pathname', function () {
        it('returns the path with a leading slash', function () {
          const href = 'http://example.com/a/cool/path';
          const expected = '/a/cool/path';
          const result = this.$url.makeUrl(href, elementFn).pathname;

          expect(result).to.eq(expected);
        });
      });
    });

    context('on sane browsers', function () {
      describe('pathname', function () {
        it('returns the path with a leading slash', function () {
          const href = 'http://example.com/a/cool/path';
          const expected = '/a/cool/path';
          const result = this.$url.makeUrl(href).pathname;

          expect(result).to.eq(expected);
        });
      });
    });
  });
});
