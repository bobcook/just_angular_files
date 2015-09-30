const Article = function (API_URL, railsResourceFactory) {
  'ngInject';

  return railsResourceFactory({
    name: 'article',
    url: `${API_URL}/v1/articles`,
  });
};

export default Article;