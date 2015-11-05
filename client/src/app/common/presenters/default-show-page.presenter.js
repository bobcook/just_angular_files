const DefaultShowPagePresenter = function ($filter) {
  'ngInject';

  const MAX_TITLE_LENGTH = 80;

  const mastHeadTitle = function (resource) {
    return $filter('limitTo')(resource.mastHeadTitle, MAX_TITLE_LENGTH);
  };

  const pluralResourceName = function (resource) {
    return `${resource.contentName}s`;
  };

  const defaultFields = function (resource) {
    return {
      benefitsToBrainHealth: resource.benefitsToBrainHealth,
      mastHeadImage: resource.mastHeadImage,
      mastHeadTitle: mastHeadTitle(resource),
      pillars: resource.pillars,
      pluralResourceName: pluralResourceName(resource),
      section1Body: resource.section1Body,
      sourceMaterialsCitation: resource.sourceMaterialsCitation,
      topLeft: _.capitalize(resource.contentName),
    };
  };

  return {
    defaultFields: defaultFields,
  };
};

export default DefaultShowPagePresenter;
