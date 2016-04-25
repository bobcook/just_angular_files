const SitemapController = function ($state, SitemapUrl) {
  'ngInject';

  const whiteListStates = [
    ['activities'],
    ['articles'],
    ['assessments', 'Take the Assessment'],
    ['static.privacy-policy', 'Privacy Policy'],
    ['static.terms-of-service', 'Terms of Service'],
    ['static.what-is-staying-sharp', 'What is Staying Sharp'],
    ['user.articles', 'My Articles'],
    ['user.assessments.overall', 'My Assessment Results'],
    ['user.games', 'My Games'],
    ['user.recipes', 'My Recipes'],
    ['user.archive', 'My Archive'],
    ['user.working-on', 'My activities'],
    ['games'],
    ['recipes'],
    [null, 'FAQ', 'https://stayingsharp.zendesk.com/hc/en-us'],
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
