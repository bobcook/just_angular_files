const ArticleReview = function ($stateParams, API_URL, railsResourceFactory) {
  'ngInject';

  const ArticleReview = railsResourceFactory({
    name: 'review',
    url: `${API_URL}/api/v1/articles/{{articleId}}/reviews`,
  });

  // "Class-level" properties
  ArticleReview.extend({
    contentName: 'Review',
  });

  // "Instance-level" properties
  ArticleReview.include({
    contentName: 'Review',
  });

  return ArticleReview;
};

export default ArticleReview;
