const ActivityTrackerQuantityEditPeriodController = function ($scope,
                                                              close,
                                                              period,
                                                              type) {
  'ngInject';

  this.close = close;
  this.period = period;
  this.type = type.split('_')[1];

  if (this.type) {
    this.trackerCopy = this.type === 'minutes' ? 'Duration' :
      this.type.charAt(0).toUpperCase() + this.type.slice(1);
  }

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
