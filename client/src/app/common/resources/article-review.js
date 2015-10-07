const ArticleReview = function ($stateParams, API_URL, railsResourceFactory) {
  'ngInject';

  const ArticleReview = railsResourceFactory({
    name: 'review',
    url: `${API_URL}/api/v1/articles/{{articleId}}/reviews`,
  });

  return ArticleReview;
};

export default ArticleReview;
