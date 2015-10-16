const ActivityCardPresenter = function (DefaultCardPresenter) {
  'ngInject';

  const Default = DefaultCardPresenter;

  const fieldOverrides = function (controller, activity) {
    return {
      cardTitle: activity.title, // TODO: change when real fields added
      cardClasses: controller.cardClasses || 'activity-card small-card',
      lowerLeft: 'Effort: ' + activity.recommendedEffortTime + ' / ' +
                 activity.recommendedEffortFrequency,
    };
  };

  return {
    forController: function (controller, activity) {
      const overrides = fieldOverrides(controller, activity);
      return Default.forController(controller, activity, overrides);
    },
  };
};

export default ActivityCardPresenter;
