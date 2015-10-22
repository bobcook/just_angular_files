const SaveUserContentController = function ($state) {
  'ngInject';

  // TODO: consider adding a service to pluralize the resource names
  const resourceName = resourceName || this.resource.config.name;

  if (this.isUserNamespace) {
    this.isSaved = true;
  } else {
    this.resource.get(this.item.id).then((response) => {
      this.isSaved = response.status === 200;
    });
  }

  this.resourceNameCapitalize = _.capitalize(`${resourceName}s`);

  this.save = function () {
    new this.resource({ articleId: this.item.id }).create().then(() => {
      this.isSaved = true;
      // show modal after saving
      $state.go(`.${resourceName}-saved`);
    });
  };

  this.delete = function () {
    this.resource.delete(this.item.id).then(() => {
      this.isSaved = false;
      // remove item from index
      if (this.items) {
        _.remove(this.items, (result) => {
          return this.item.id === result.id;
        });
      }
      // redirect to 'my/resources'
      if (this.isUserNamespace) {
        $state.go(`application.user.${resourceName}s`);
      }
    });
  };
};

export default SaveUserContentController;
