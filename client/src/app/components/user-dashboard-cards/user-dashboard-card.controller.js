const UserDashboardCardController = function ($filter,
                                              $state,
                                              presenterDispatch,
                                              UserActivity,
                                              Game) {
  'ngInject';

  // TODO: pull out commonality w/ normal cards

  this.archiveActivity = () => {
    this.card.archive();
    _.remove(this.items, this.card);
    $state.go('.activity-archived', { id: this.card.slug });
  };

  this.isUserNamespace = true;
  this.items = this.items || []; // via ss-items
  this.card = this.card || null; // via ss-card-for

  this.useActivityTracker = () => {
    return this.resource.contentName === UserActivity.contentName;
  };

  this.resourceIsGame = () => {
    return this.resource.contentName === Game.contentName;
  };

  this.resourcePath = this.card.uiSref;
  this.cardImage = this.card.cardImage;

  const getPresenter = () => {
    const contentName = this.card.recommendableType ?
      this.card.recommendableType : this.card.contentName;

    return presenterDispatch.getPresenter(contentName);
  };

  const content = this.card.recommendable ? this.card.recommendable : this.card;
  getPresenter().forController(this, content);
};

export default UserDashboardCardController;
