const ActivityTrackerQuantityController = function ($scope) {
  'ngInject';

  let periods = this.periods;
  $scope.$parent.$watch('vm.currentWeek', function (updatedPeriods) {
    periods = updatedPeriods;
  });

  this.activityResponseMax = () => {
    const responses = _.map(
      periods,
      per => per.activityTrackerResponses[0].response
    );
    return Math.max.apply(Math, responses);
  };

  this.periodHeight = (num) => {
    const percentage = (num / this.activityResponseMax()) * 100;
    return {
      'height': percentage + '%',
    };
  };
};

export default ActivityTrackerQuantityController;
