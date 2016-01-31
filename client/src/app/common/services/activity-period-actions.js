const ActivityPeriodActions = function (ModalService) {
  'ngInject';

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

  const edit = (type, period) => {
    switch (true) {
    case /binary/.test(type): return toggleBinaryPeriod(period);
    case /quantity/.test(type): return openQuantityModal(period, type);
    case /scale/.test(type): return openScaleModal(period, type);
    default: console.error(`Unknown tracker type ${type}`);
    }
  };

  return {
    edit: edit,
  };
};

export default ActivityPeriodActions;
