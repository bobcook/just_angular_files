const RelatedContentController = function (RelatedContent,
                                           RelatedContentGames) {
  'ngInject';

  const NUM_TOP_ITEMS = 2;
  const NUM_BOTTOM_ITEMS = 3;
  const NUM_RELATED_GAMES = 2;

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
      const topItems = content.articles.length > 0 ?
        content.articles.concat(content.recipes) : content.games;
      const bottomItems = content.activities || [];

      this.topItems = _.take(_.shuffle(topItems), NUM_TOP_ITEMS);
      this.bottomItems = _.take(_.shuffle(bottomItems), NUM_BOTTOM_ITEMS);
    };

    getRelatedContent().then(setRelatedContent);
  };
};

export default RelatedContentController;

