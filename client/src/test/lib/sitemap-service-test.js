const expect = require('chai').expect;
const td = require('testdouble');
const SitemapService = require('../../lib/services/sitemap-service');
const _ = require('lodash');

describe('sitemap service', function () {
  describe('createSitemap', function () {
    beforeEach(() => {
      this.hostname = 'example.com';
      const request = {
        headers: {
          host: this.hostname
        }
      };
      const dataSource = () => {
        return new Promise(function (resolve, reject) {
          resolve([
            {
              'url': '/'
            },
            {
              'url': '/articles'
            },
            {
              'url':'/art/nourish/16/coffee-brain-effect.html',
              'lastModified':'2016-03-22T20:21:11Z'
            },
            {
              'url':'/art/nourish/16/onions-vitamin-b6.html',
              'lastModified':'2016-03-22T20:15:58Z'
            }
          ]);
        });
      };
      this.subject = SitemapService.createSitemap(request, dataSource)
    });

    it('generates sitemap with correct hostname', () => {
      return this.subject.then((sitemap) => {
        expect(sitemap.hostname).to.eq('https://' + this.hostname);
      })
    });

    it('generates sitemap with hangefreq of monthly', () => {
      return this.subject.then((sitemap) => {
        expect(getLoc('/', sitemap).changefreq).to.eq('monthly');
      });
    });

    context('for home route', () => {
      it('should have a priority of 0.1', () => {
        return this.subject.then((sitemap) => {
          expect(getLoc('/', sitemap).priority).to.eq(0.1);
        });
      });
    });

    context('for content route with 4 url segments', () => {
      it('should have a priority of 0.6', () => {
        return this.subject.then((sitemap) => {
          const loc =
            getLoc('/art/nourish/16/coffee-brain-effect.html', sitemap);
          expect(loc.priority).to.eq(0.6);
        });
      });
    });

    context('for route with one segment', () => {
      it('should have a priority of 0.9', () => {
        return this.subject.then((sitemap) => {
          expect(getLoc('/articles', sitemap).priority).to.eq(0.9);
        });
      });
    });
  });
});

const getLoc = (url, sitemap) => {
  return _.find(sitemap.urls, (e) => { return e.url === url });
};
