const ArticleController = function (Article,
                                    ArticleReview,
                                    CMS_BASE_URL,
                                    UserArticle,
                                    dsoModalService,
                                    $rootScope,
                                    $stateParams) {
  'ngInject';

  const id = $stateParams.id.replace('.html', '');
  // get one article
  Article.get(id).then((article) => {
    this.article = article.data;
  });

  const getBodyImageData = (dataOffset) => {
    let bodyImage = this.article.bodyImage;
    if (bodyImage &&
        _.isArray(bodyImage) &&
        bodyImage.length > 0) {
      bodyImage = bodyImage[0].split(',');
      return dataOffset < bodyImage.length ? bodyImage[dataOffset] : null;
    }
    return dataOffset === 0 ? bodyImage : null;
  };

  this.getBodyImage = () => {
    const imageData = getBodyImageData(0);
    return imageData && imageData.indexOf(CMS_BASE_URL) === -1 ?
      `${CMS_BASE_URL}${imageData}` : imageData;
  };

  this.getBodyImageDescription = () => getBodyImageData(1);

  this.openRegisterModal = dsoModalService.showRegisterModal;

  this.showAd =
    !$rootScope.$currentUser || $rootScope.$currentUser.isRegistered();

  // pass values to directive
  this.isContentDrawerOpen = false;
  this.isUserNamespace = false;
  this.resource = Article;
  this.reviewResource = ArticleReview;
  this.pluralResourceName = 'articles';
  this.userResource = UserArticle;
};

export default ArticleController;
