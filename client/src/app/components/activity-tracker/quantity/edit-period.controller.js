const ActivityTrackerQuantityEditPeriodController = function ($scope,
                                                              close,
                                                              period,
                                                              type) {
  'ngInject';

  this.close = close;
  this.period = period;

  if (type === 'scale') {
    this.maxValue = 5;
  }

  const responseValues = () =>
    this.period.activityTrackerResponses.map(r => r.response);

  $scope.$watch(responseValues, () => {
    this.period.update();
  }, true);
};

export default ActivityTrackerQuantityEditPeriodController;
