const RelatedContentController = function (RelatedContent,
                                           RelatedContentGames) {
  'ngInject';

  const NUM_ARTICLES = 2;
  const NUM_ACTIVITIES = 3;

  const articlesForRows = function (articles, range) {
    const start = i => i * NUM_ARTICLES;
    const end = i => start(i) + NUM_ARTICLES;
    return _.map(range, i => _.slice(articles, start(i), end(i)));
  };

  this.loadResource = (resource) => {
    if (_.isUndefined(resource)) { return; }

    this.resource = resource; // Via ss-resource

    const getRelatedContent = () => {
      const RelatedContentResource = this.resourceName === 'Game' ?
        RelatedContentGames : RelatedContent;
      const pillarSlugs = _.pluck(this.resource.pillars, 'slug');
      return RelatedContentResource.query({ 'pillars[]': pillarSlugs });
    };

    const setRelatedContent = (content) => {
      const articles = content.articles || [];
      const activities = content.activities || [];

      this.articles = _.flatten(articlesForRows(articles, [0]));
      this.unpaidArticles = articlesForRows(articles, [1, 2]);
      this.activities = _.take(_.shuffle(activities), NUM_ACTIVITIES);
    };

    getRelatedContent().then(setRelatedContent);
  };
};

export default RelatedContentController;
