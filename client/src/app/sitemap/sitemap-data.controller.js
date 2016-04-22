const SitemapDataController = function ($state,
                                        $q,
                                        $promise,
                                        SitemapUrl,
                                        Article,
                                        FreeGame) {
  'ngInject';

  const whileListStates = [
    ['home'],
    ['articles'],
    ['assessments', 'Take the Assessment'],
    ['static.privacy-policy'],
    ['static.terms-of-service'],
    ['static.what-is-staying-sharp'],
    ['games'],
  ];

  const getStaticUrls = (states) => {
    return _.map(states, (params) => {
      const [state, display = null, url = null] = params;
      return new SitemapUrl(state, display, url);
    });
  };

  const getContentUrls = (resourceType) => {
    return resourceType.query({ page: 1, perPage: 300 }).then((res) => {
      return _.map(res.data, (resource) => {
        return {
          url: resourceUrl(resource),
          lastModified: resource.lastModified,
        };
      });
    });
  };

  const resourceUrl = (resource) => {
    const content = (resource.contentName === 'Article') ? 'article' : 'game';
    return $state.href(
      `application.${content}`,
      {
        id: resource.slug,
        pillar: resource.pathPillar,
        year: resource.pathYear,
      }
    );
  };

  const getUrl = _.partialRight(_.get, 'url');

  $q.all([
    $promise.of(_.map(getStaticUrls(whileListStates, getUrl))),
    getContentUrls(Article),
    getContentUrls(FreeGame)
  ]).then((results) => {
    this.urls = _.flatten(results)
  });
};

export default SitemapDataController;
