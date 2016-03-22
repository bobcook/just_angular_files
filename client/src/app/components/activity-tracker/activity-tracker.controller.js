const ActivityTrackerController = function (ActivityPeriodActions,
                                            $moment,
                                            $scope,
                                            dependentMemoize) {
  'ngInject';

  // XXX: remove; for debugging UTC/timezone offset issue
  //const tk = require('timekeeper');
  //const yesterdayDay = $moment().subtract(24, 'hours').toDate();
  //const yesterdayNight = $moment().subtract(12, 'hours').toDate();
  //const now = $moment();
  //const tonight = $moment().add(6, 'hours').toDate();
  //const newTime = yesterdayDay;
  //tk.travel(newTime);
  //console.dir($moment().format('l LT'));

  const daysForGroup = function (periodGroup) {
    const today = $moment().utc().local();
    const notAfterToday = function (period) {
      return !period.date.isAfter(today);
    };
    // XXX: deal w/ UTC/timezone offset issue
    //return _.filter(periodGroup[1], notAfterToday);
    return periodGroup[1];
  };

  dependentMemoize.defineProperty(
    this, 'todayPeriod',
    () => this.activity && this.activity.userActivityPeriods,
    periods => periods && _.find(periods, period =>
      period.date.isSame(Date.now(), 'day')));

  dependentMemoize.defineProperty(
    this, 'periodsByWeek',
    () => this.activity && this.activity.userActivityPeriods,
    function (periods) {
      // _.groupBy converts the keys to strings because it stores the results
      // in a JavaScript object (which can only have string keys). Since we need
      // to sort by these keys below, the easiest way is to just convert the
      // year + week combo into a number, ensuring the year is the most
      // significant by putting it ahead of the week while it is still a string.
      const groups = _.groupBy(periods, function (period) {
        let yearPart = period.date.year();
        let weekPart = period.date.startOf('week').week();

        // For the last week of the year, we want to group the days of the week
        // from the previous year and the current year.
        if (period.date.year() !== period.date.startOf('week').year()) {
          yearPart = period.date.startOf('week').year();
        }

        weekPart = _.padLeft(weekPart, 2, '0');

        return `${yearPart}${weekPart}`;
      });
      const sortedGroups = _.sortBy(_.pairs(groups), g => _.parseInt(g[0]));
      return _.map(sortedGroups, daysForGroup);
    });

  this.chartType =
    this.activity.activityTracker.type === 'binary' ? 'binary' : 'bar-chart';

  this.editPeriod = function (period) {
    const trackerType = this.activity.activityTracker.type;
    return ActivityPeriodActions.edit(trackerType, period);
  };

  // can't use dependentMemoize here because this.currentWeek isn't read-only
  $scope.$watch(() => this.activity, () => {
    this.currentWeek = _.last(this.periodsByWeek);
  });

  this.selectWeek = (week) => {
    this.currentWeek = week;
  };

  this.todayDate = new Date();
};

export default ActivityTrackerController;
