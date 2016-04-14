const SitemapController = function ($state, sitemapUrls) {

  'ngInject';

  this.urls = sitemapUrls.urlObjectArray();
};

export default SitemapController;
