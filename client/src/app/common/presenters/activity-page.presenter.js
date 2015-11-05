const ActivityPagePresenter = function ($filter,
                                        $presenterUtils,
                                        DefaultShowPagePresenter) {
  'ngInject';

  const Default = DefaultShowPagePresenter;

  const overrideFields = function (activity) {
    return {
      content: {
        '': activity.howTo,
      },
      contentSubtitle: activity.effortText,
      contentTitle: 'Ways to Work on This:',
      lowerLeft: activity.effortText,
      pluralResourceName: 'activities',
      saveButtonDisplayContent: {
        unsaved: 'Save & Work on This',
        saved: 'Working on It',
      },
    };
  };

  return {
    // forController :: Controller -> Resource -> ModifiedResource
    forController:
      $presenterUtils.withFieldsFrom(Default.defaultFields, overrideFields),
  };
};

export default ActivityPagePresenter;
