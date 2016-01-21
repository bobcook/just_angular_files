const ActivityTrackerQuantityController = function () {

  const periods = this.periods;
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
