const SitemapUrl = function ($state) {
  'ngInject';

  const SitemapUrl = class SitemapUrl {
    constructor(stateName, displayName, url) {
      this.displayName = displayName || _.startCase(stateName);
      this.url = url || $state.href(`application.${stateName}`);
    };
  };

  return SitemapUrl;
};

export default SitemapUrl;
