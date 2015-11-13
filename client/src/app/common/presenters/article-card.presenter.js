const ArticleCardPresenter = function ($filter,
                                       $presenterUtils,
                                       DefaultCardPresenter) {
  'ngInject';

  const Default = DefaultCardPresenter;

  const MAX_ABSTRACT_LENGTH = 100;

  const getTitle = function (article) {
    return $filter('limitTo')(article.description, MAX_ABSTRACT_LENGTH);
  };

  const overrideFields = function (article, controller) {
    return {
      cardClasses: controller.cardClasses || 'article-card',
      cardContent: getTitle(article),
      cardTitle: article.title, // TODO: change when real content fields added
      lowerLeft: article.duration, // TODO: real implementation
    };
  };

  return {
    // forController :: Controller -> Resource -> MutatedController
    forController:
      $presenterUtils.withFieldsFrom(Default.defaultFields, overrideFields),
  };
};

export default ArticleCardPresenter;
