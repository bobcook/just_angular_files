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

  const today = function () { return $moment().utc().local(); };

  const notAfterToday = function (period) {
    // TODO better implementation?
    const todayDate = _.parseInt(today().format('YYYYDDDD'));
    const periodDate = _.parseInt(period.date.utc().local().format('YYYYDDDD'));
    return periodDate <= todayDate;
  };

  const nonPastPeriods = function (periods) {
    return _.filter(periods, notAfterToday);
  };

  // TODO: consolidate this and other toggleBinaryPeriod
  const toggleBinaryPeriod = function (period) {
    const response = period.activityTrackerResponses[0];
    response.response = response.response === 0 ? 1 : 0;
    period.update();
  };

  dependentMemoize.defineProperty(
    this, 'periodsThisWeek',
    () => this.activity && this.activity.userActivityPeriods,
    periods => periods && sortedPeriodsThisWeek(periods));

  dependentMemoize.defineProperty(
    this, 'modifiablePeriodsThisWeek',
    () => this.activity && this.activity.userActivityPeriods,
    periods => periods && nonPastPeriods(this.periodsThisWeek));

  const dayNames = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'];

  // TODO: better implementation
  this.outstandingDays = function () {
    const shownDays = _.map(this.periodsThisWeek, this.showDayFor);
    const result = _.reject(dayNames, name => _.contains(shownDays, name));
    return result;
  };

  // TODO: better implementation
  this.showDayFor = function (period) {
    const formattedName = period.date.format('dd');
    const twoLetters = ['Th', 'Sa', 'Su'];
    if (_.contains(twoLetters, formattedName)) {
      return formattedName;
    } else {
      return $filter('limitTo')(formattedName, 1);
    };
  };

  this.isTracked = function (period) {
    return period.isTracked;
  };

  this.isModifiable = function (period) {
    return _.contains(this.modifiablePeriodsThisWeek, period);
  };

  this.isToday = function (period) {
    // TODO better implementation?
    const todayDate = _.parseInt(today().format('YYYYDDDD'));
    const periodDate = _.parseInt(period.date.utc().local().format('YYYYDDDD'));

    return todayDate === periodDate;
  };

  this.todayPeriod = function () {
    return _.find(this.modifiablePeriodsThisWeek, (period) => {
      return this.isToday(period);
    });
  };

  this.todayIsTracked = function () {
    return this.todayPeriod() && this.isTracked(this.todayPeriod());
  };

  this.editPeriod = toggleBinaryPeriod;
};

export default CardActivityTrackerController;
