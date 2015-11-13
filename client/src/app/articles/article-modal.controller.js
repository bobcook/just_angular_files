const ArticleModalController = function (Article,
                                         $currentModal,
                                         $location,
                                         $stateParams) {
  'ngInject';

  Article.get($stateParams.id).then((response) => {
    this.resource = response.data;
    this.resourceTitle = this.resource.title;
    this.resourceURL = $location.absUrl();
    this.durationText = this.resource.duration;
  });

  this.closeModal = $currentModal.close;
  this.resourceName = 'article';
  this.pluralResourceName = `${this.resourceName}s`;
  this.explorePath = `application.${this.pluralResourceName}`;
  this.stayingSharpPath = `application.user.${this.pluralResourceName}`;
};

export default ArticleModalController;
