const RelatedContentController = function (RelatedContent) {
  'ngInject';

  const NUM_RELATED_ARTICLES_AND_RECIPES = 2;
  const NUM_RELATED_ACTIVITIES = 3;

  this.loadResource = (resource) => {
    if (_.isUndefined(resource)) { return; }

    this.resource = resource; // Via ss-resource

    const getRelatedContent = () => {
      const pillarSlugs = _.pluck(this.resource.pillars, 'slug');
      return RelatedContent.query({ 'pillars[]': pillarSlugs });
    };

    const setRelatedContent = (content) => {
      const articlesAndRecipes =
        _.shuffle(content.articles.concat(content.recipes));

      this.relatedArticlesAndRecipes =
        _.take(articlesAndRecipes, NUM_RELATED_ARTICLES_AND_RECIPES);
      this.relatedActivities =
        _.take(content.activities, NUM_RELATED_ACTIVITIES);
    };

    getRelatedContent().then(setRelatedContent);
  };
};

export default RelatedContentController;
