const ActivityTrackerQuantityController = function () {
  this.maxResponse = () => {
    if (this.type === 'scale') {
      return 5;
    } else {
      return _.max(_.map(this.periods, (period) =>
        period.activityTrackerResponses[0].response));
    }
  };
};

export default ActivityTrackerQuantityController;
