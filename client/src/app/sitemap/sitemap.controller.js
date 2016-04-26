const SitemapController = function ($state, SitemapUrl) {
  'ngInject';

  const whiteListStates = [
    ['static.what-is-staying-sharp', 'What is Staying Sharp'],
    [null, 'FAQs', 'https://stayingsharp.zendesk.com/hc/en-us'],
    ['assessments', 'Take the Assessment'],
    ['activities'],
    ['articles'],
    ['games'],
    ['recipes'],
    ['user.working-on', 'My Staying Sharp'],
  ];

  const createSitemapUrls = (states) => {
    return _.map(states, (params) => {
      const [state, display = null, url = null] = params;
      return new SitemapUrl(state, display, url);
    });
  };

  this.sitemapUrls = createSitemapUrls(whiteListStates);
};

export default SitemapController;
