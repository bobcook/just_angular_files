describe('$url', function () {
  beforeEach(loadApp);

  let $url;

  beforeEach(inject(function(_$url_) {
    $url = _$url_;
  }));

  describe('copyPathFrom', function () {
    it('copies the path from the source to destination', function () {
      const srcUrl = 'http://example.com/some/cool/path';
      const destUrl = 'http://other.example.com';
      const expectedUrl = 'http://other.example.com/some/cool/path';
      const result = $url.copyPathFrom(srcUrl, destUrl);

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
          const result = $url.makeUrl(href, elementFn).pathname;

          expect(result).to.eq(expected);
        });
      });
    });

    context('on sane browsers', function () {
      describe('pathname', function () {
        it('returns the path with a leading slash', function () {
          const href = 'http://example.com/a/cool/path';
          const expected = '/a/cool/path';
          const result = $url.makeUrl(href).pathname;

          expect(result).to.eq(expected);
        });
      });
    });
  });

  describe('matchingPathname', function () {
    const makeUrl = function (urlString) { return $url.makeUrl(urlString) };
    context('given a pathname', function () {
      it('is true when the given url has the pathname', function () {
        const pathname = '/employee';
        const url = makeUrl('https://www.example.com/employee');
        const result = $url.matchingPathname(url, pathname);

        expect(result).to.eq(true);
      });

      it('is false otherwise', function () {
        const pathname = '/notthesame';
        const url = makeUrl('https://www.example.com/employee');
        const result = $url.matchingPathname(url, pathname);

        expect(result).to.eq(false);
      });
    });

    context('given a URL', function () {
      it('is true when the given url has the pathname', function () {
        const baseUrl = makeUrl('https://www.blargh.com/employee');
        const checkUrl = makeUrl('https://www.example.com/employee');
        const result = $url.matchingPathname(baseUrl, checkUrl);

        expect(result).to.eq(true);
      });

      it('is false otherwise', function () {
        const pathname = 'https://www.example.com/notthesame';
        const url = makeUrl('https://www.example.com/employee');
        const result = $url.matchingPathname(url, pathname);

        expect(result).to.eq(false);
      });
    });
  });
});
