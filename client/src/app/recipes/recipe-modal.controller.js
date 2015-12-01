const RecipeModalController = function (Recipe,
                                        $currentModal,
                                        $location,
                                        $stateParams) {
  'ngInject';

  Recipe.get($stateParams.id).then((response) => {
    this.resource = response.data;
    this.resourceTitle = this.resource.title;
    this.durationText = `Prep time: ${this.resource.duration}`;
  });

  this.closeModal = $currentModal.close;
  this.resourceName = 'recipe';
  this.pluralResourceName = `${this.resourceName}s`;
  this.explorePath = `application.${this.pluralResourceName}`;
  this.stayingSharpPath = `application.user.${this.pluralResourceName}`;
};

export default RecipeModalController;
