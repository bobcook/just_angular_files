const UserActivityCardPresenter = function ($filter,
                                            $presenterUtils,
                                            DefaultCardPresenter) {
  'ngInject';

  const Default = DefaultCardPresenter;
  const MAX_TITLE_LENGTH = 80;

  const mondays = function (periods) {
    return _.filter(periods, p => p.date.format('dddd') === 'Monday');
  };

  const numWeeksSinceStart = function (periods) {
    return _.size(mondays(periods));
  };

  const weekText = function (userActivity) {
    const numWeeks = numWeeksSinceStart(userActivity.userActivityPeriods);
    return `Week ${numWeeks}`;
  };

  const cardTitle = function (userActivity) {
    return $filter('limitTo')(userActivity.cardTitle, MAX_TITLE_LENGTH);
  };

  const overrideFields = function (userActivity, controller) {
    return {
      cardContent: '',
      cardClasses: controller.cardClasses || 'tracker-card small-card',
      upperRight: weekText(userActivity),
      lowerLeft: userActivity.effortText,
      upperLeft: 'Activity',
      cardTitle: cardTitle(userActivity),
    };
  };

  return {
    forController:
      $presenterUtils.withFieldsFrom(Default.defaultFields, overrideFields),
  };
};

export default UserActivityCardPresenter;
