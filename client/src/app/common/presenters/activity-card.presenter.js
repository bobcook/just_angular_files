const ActivityCardPresenter = function ($presenterUtils,
                                        DefaultCardPresenter) {
  'ngInject';

  const Default = DefaultCardPresenter;

  const overrideFields = function (activity, controller) {
    return {
      cardContent: '',
      cardClasses: controller.cardClasses || 'activity-card small-card',
      lowerLeft: activity.effortText,
    };
  };

  return {
    // forController :: Controller -> Resource -> MutatedController
    forController:
      $presenterUtils.withFieldsFrom(Default.defaultFields, overrideFields),
  };
};

export default ActivityCardPresenter;
