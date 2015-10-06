const UserArticlesController = function (Article) {
  'ngInject';

  Article.queryUserArticles().then((articles)=>{
    this.articles = articles;
  });
};

export default UserArticlesController;
