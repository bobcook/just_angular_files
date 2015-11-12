const cardActivityTracker = function () {
  return {
    controller: 'CardActivityTrackerController',
    controllerAs: 'vm',
    bindToController: true,
    templateUrl: 'app/components/card-activity-tracker/card-activity-tracker.html',
    restrict: 'E',
    replace: true,
    scope: {
      activity: '=ssActivity',
    },
  };
};

export default cardActivityTracker;
