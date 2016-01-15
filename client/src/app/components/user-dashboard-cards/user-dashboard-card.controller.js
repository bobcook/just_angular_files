const UserDashboardCardController = function ($filter,
                                              UserActivity) {
  'ngInject';

  const MAX_TITLE_LENGTH = 80;
  const MAX_USER_ACTIVITIES = 6;

  // TODO: pull out commonality w/ normal cards
  const cardTitle = function (card) {
    return $filter('limitTo')(card.cardTitle, MAX_TITLE_LENGTH);
  };

  const effortText = function (card) { return card.effortText; };

  // TODO: pull out common week calc logic from here,
  // card tracker controller, etc
  const mondays = function (periods) {
    return _.filter(periods, p => p.date.format('dddd') === 'Monday');
  };

  const numWeeksSinceStart = function (periods) {
    // TODO: more robust implementation?
    return _.size(mondays(periods));
  };

  const weekText = function (card) {
    const numWeeks = numWeeksSinceStart(card.userActivityPeriods);
    return `Week ${numWeeks}`;
  };

  this.resource = UserActivity;
  this.pluralResourceName = 'Activities';
  this.isUserNamespace = true;
  this.items = this.items || []; // via ss-items
  this.card = this.card || null; // via ss-card-for

  this.showEncouragementMessage = function () {
    return (this.items.length < MAX_USER_ACTIVITIES) && this.lastItem;
  };

  this.header = {
    upperLeft: this.card.contentName,
    cardTitle: cardTitle(this.card),
  };
  this.body = {
    upperLeft: effortText(this.card),
    upperRight: weekText(this.card),
  };
  this.footer = {
    pillars: this.card.pillars,
  };
  this.resourcePath = this.card.uiSref;
  this.cardImage = this.card.cardImage;
};

export default UserDashboardCardController;
