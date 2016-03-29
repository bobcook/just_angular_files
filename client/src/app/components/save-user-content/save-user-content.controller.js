const SaveUserContentController = function ($state,
                                            $filter,
                                            $loadCurrentUser,
                                            $rootScope) {
  'ngInject';

  const defaultContent = function (resourceName) {
    return {
      'unsaved': `Save to My ${$filter('capitalize')(resourceName)}`,
      'saved': `Remove from Saved ${$filter('capitalize')(resourceName)}`,
    };
  };

  const updateEngagementLevel = function () {
    $loadCurrentUser($rootScope.$currentUser);
  };

  const resourceName =
    $filter('downcase')(this.resource.contentName);

  // via ss-plural-resource-name
  this.pluralResourceName = this.pluralResourceName || 'OVERRIDE';
  // via ss-display-content
  this.displayContent =
    this.displayContent || defaultContent(this.pluralResourceName);
  this.item = this.item || null; // Via ss-item
  this.savedItem = this.savedItem || null; // Via ss-saved-item

  // Css selector for Adobe DTM
  this.dtmSelector = function () {
    if (this.isSaved) {
      return `analytics-unsave-${resourceName}`;
    } else {
      return `analytics-save-${resourceName}`;
    }
  };

  if (this.isUserNamespace) {
    this.isSaved = true;
  } else {
    // Activity actually uses UserActivity as the resource. Therefore we have to
    //  get by "this.item.id" instead of "this.item.slug"
    const id =
      this.resource.contentName === 'Activity' ? this.item.id : this.item.slug;
    this.resource.get(id).then((response) => {
      this.savedItem = response.data;
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
    new this.resource(args).create().then((response) => {
      if (response.status === 201) {
        if (resourceName === 'activity') {
          updateEngagementLevel();
        }
        this.savedItem = _.isEmpty(response) ? null : response.data;
        this.isSaved = true;
        // show modal after saving
        $state.go(`.${resourceName}-saved`);
      } else {
        $state.go(`.${resourceName}-save-failed`);
      }
    });
  };

  this.delete = function () {
    this.resource.delete(this.item.id).then(() => {
      if (resourceName === 'activity') {
        updateEngagementLevel();
      }
      this.savedItem = null;
      this.isSaved = false;
      // remove item from index
      if (this.items) {
        _.remove(this.items, (result) => {
          return this.item.id === result.id;
        });
      }
      // redirect to 'my/resources'
      if (this.isUserNamespace) {
        const defaultSref = `application.user.${resourceName}s`;
        const redirectSref = this.redirectSref || defaultSref;
        $state.go(redirectSref);
      }
    });
  };
};

export default SaveUserContentController;
