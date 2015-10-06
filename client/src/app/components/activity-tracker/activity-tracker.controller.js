const ActivityTrackerController = function (ModalService,
                                            $scope,
                                            dependentMemoize) {
  'ngInject';

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
      // significant by multiplying it by 100 first.
      const groups = _.groupBy(periods, period =>
        period.date.year() * 100 + period.date.week());
      const sortedGroups = _.sortBy(_.pairs(groups), g => _.parseInt(g[0]));
      return _.map(sortedGroups, g => g[1]);
    });

  this.editPeriod = (period) => {
    const type = this.activity.activityTracker.type;
    switch (type) {
    case 'binary':
      toggleBinaryPeriod(period);
      break;
    case 'quantity':
    case 'scale':
      openQuantityModal(period, type);
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

  // can't use dependentMemoize here because this.currentWeek isn't read-only
  $scope.$watch(() => this.activity, () => {
    this.currentWeek = _.last(this.periodsByWeek);
  });

  this.selectWeek = (week) => {
    this.currentWeek = week;
  };
};

export default ActivityTrackerController;
