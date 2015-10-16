const ArticleCardPresenter = function ($filter, DefaultCardPresenter) {
  'ngInject';

  const Default = DefaultCardPresenter;

  const MAX_ABSTRACT_LENGTH = 100;

  const getTitle = function (article) {
    return $filter('limitTo')(article.description, MAX_ABSTRACT_LENGTH);
  };

  const fieldOverrides = function (controller, article) {
    return {
      cardClasses: controller.cardClasses || 'article-card',
      cardContent: getTitle(article),
      cardTitle: article.title, // TODO: change when real content fields added
      lowerLeft: `Read time: ${article.duration}`, // TODO: real implementation
    };
  };

  return {
    forController: function (controller, article) {
      const overrides = fieldOverrides(controller, article);
      return Default.forController(controller, article, overrides);
    },
  };
};

export default ArticleCardPresenter;
