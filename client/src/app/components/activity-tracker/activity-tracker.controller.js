const ActivityTrackerController = function (ModalService,
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
        const yearPart = period.date.year();
        const weekPart = period.date.startOf('week').week();
        return `${yearPart}${weekPart}`;
      });
      const sortedGroups = _.sortBy(_.pairs(groups), g => _.parseInt(g[0]));
      return _.map(sortedGroups, daysForGroup);
    });

  this.chartType =
    this.activity.activityTracker.type === 'binary' ? 'binary' : 'bar-chart';

  this.editPeriod = (period) => {
    const type = this.activity.activityTracker.type;
    switch (true) {
    case /binary/.test(type):
      toggleBinaryPeriod(period);
      break;
    case /quantity/.test(type):
      openQuantityModal(period, type);
      break;
    case /scale/.test(type):
      openScaleModal(period, type);
      break;
    }
  };

  const toggleBinaryPeriod = function (period) {
    const response = period.activityTrackerResponses[0];
    response.response = response.response === 0 ? 1 : 0;
    period.update();
  };

  const openQuantityModal = function (period, type) {
    ModalService.showModal({
      controller: 'ActivityTrackerQuantityEditPeriodController',
      controllerAs: 'vm',
      templateUrl: 'app/components/activity-tracker/quantity/edit-period.html',
      inputs: { period, type },
    });
  };

  const openScaleModal = function (period, type) {
    ModalService.showModal({
      controller: 'ActivityTrackerQuantityEditPeriodController',
      controllerAs: 'vm',
      templateUrl: 'app/components/activity-tracker/scale/edit-period.html',
      inputs: { period, type },
    });
  };

  // can't use dependentMemoize here because this.currentWeek isn't read-only
  $scope.$watch(() => this.activity, () => {
    this.currentWeek = _.last(this.periodsByWeek);
  });

  this.selectWeek = (week) => {
    this.currentWeek = week;
  };
};

export default ActivityTrackerController;
