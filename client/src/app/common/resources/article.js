const Article = function (API_URL, railsResourceFactory) {
  'ngInject';

  const Article = railsResourceFactory({
    name: 'article',
    url: `${API_URL}/api/v1/articles/{{id}}`,
  });

  const userArticleUrl = `${API_URL}/api/v1/me/articles`;

  Article.prototype.saveUserArticle = function () {
    return this.$post(userArticleUrl);
  };

  Article.queryUserArticles = function () {
    return this.$get(userArticleUrl);
  };

  Article.queryUserArticle = function (id) {
    return this.$get(`${userArticleUrl}/${id}`);
  };

  return Article;
};

export default Article;
