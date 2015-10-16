const RecipeModalController = function (Recipe, $stateParams, $currentModal) {
  'ngInject';

  Recipe.get($stateParams.id).then((response) => {
    this.resource = response.data;
    this.resourceTitle = this.resource.title;
    this.resourceURL = this.resource.$url();
    this.durationText = `Prep time: ${this.resource.duration}`;
  });

  this.closeModal = $currentModal.close;
  this.resourceName = 'recipe';
  this.pluralResourceName = `${this.resourceName}s`;
  this.explorePath = `application.${this.pluralResourceName}`;
  this.stayingSharpPath = `application.user.${this.pluralResourceName}`;
};

export default RecipeModalController;
