const CardActivityTrackerController = function ($filter,
                                                $moment,
                                                dependentMemoize) {
  'ngInject';

  const weekOf = function (moment) {
    return moment.startOf('week');
  };

  const periodInThisWeek = function (period) {
    const thisWeek = weekOf($moment());
    return weekOf(period.date).isSame(thisWeek);
  };

  const sortedPeriodsThisWeek = function (periods) {
    const thisWeekPeriods = _.filter(periods, periodInThisWeek);
    const pairs = _.map(thisWeekPeriods, function (period) {
      return [_.parseInt(period.date.format('YYYYDDDD')), period];
    });

    const sortedPairs = _.sortBy(pairs, p => p[0]);
    return _.map(sortedPairs, p => p[1]);
  };

  dependentMemoize.defineProperty(
    this, 'periodsThisWeek',
    () => this.activity && this.activity.userActivityPeriods,
    periods => periods && sortedPeriodsThisWeek(periods));

  this.showDayFor = function (period) {
    return $filter('limitTo')(period.date.format('dd'), 1);
  };
};

export default CardActivityTrackerController;
