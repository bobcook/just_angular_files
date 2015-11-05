const SaveUserContentController = function ($state, $filter) {
  'ngInject';

  const defaultContent = function (resourceName) {
    return {
      'unsaved': `Save to My ${$filter('capitalize')(resourceName)}`,
      'saved': `Remove from Saved ${$filter('capitalize')(resourceName)}`,
    };
  };

  const resourceName =
    $filter('downcase')(this.resource.contentName);

  // via ss-plural-resource-name
  this.pluralResourceName = this.pluralResourceName || 'OVERRIDE';
  // via ss-display-content
  this.displayContent =
    this.displayContent || defaultContent(this.pluralResourceName);
  this.item = this.item || null; // Via ss-item

  if (this.isUserNamespace) {
    this.isSaved = true;
  } else {
    this.resource.get(this.item.id).then((response) => {
      this.isSaved = response.status === 200;
    });
  }

  this.saveOrDelete = function () {
    if (this.isSaved) {
      this.delete();
    } else {
      this.save();
    }
  };

  this.save = function () {
    const resourceIdField = `${resourceName}Id`;
    const args = {};
    args[resourceIdField] = this.item.id;
    new this.resource(args).create().then(() => {
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
