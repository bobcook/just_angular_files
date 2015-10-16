const DefaultCardPresenter = function ($filter) {
  'ngInject';

  const MAX_TITLE_LENGTH = 80;

  const defaultReturn = function (resource) { return ''; };

  const cardClasses = defaultReturn;

  const cardContent = function (resource) {
    return resource.description || '';
  };

  const cardImage = function (resource) {
    return resource.cardImage || ''; // TODO: default card image?
  };

  const cardTitle = function (resource) {
    return $filter('limitTo')(resource.cardTitle, MAX_TITLE_LENGTH);
  };

  const lowerLeft = defaultReturn;

  const lowerRight = function (resource) {
    return '85%'; // TODO: actual content
  };

  const pillars = function (resource) { return resource.pillars; };

  const resourcePath = function (resource) { return resource.uiSref; };

  const upperRight = defaultReturn;

  const upperLeft = function (resource) { return resource.contentName; };

  const defaultPresentableFields = function (resource) {
    return {
      cardContent: cardContent(resource),
      cardClasses: cardClasses(resource),
      cardImage: cardImage(resource),
      cardTitle: cardTitle(resource),
      lowerLeft: lowerLeft(resource),
      lowerRight: lowerRight(resource),
      pillars: pillars(resource),
      resourcePath: resourcePath(resource),
      upperRight: upperRight(resource),
      upperLeft: upperLeft(resource),
    };
  };

  const forController = function (controller,
                                  resource,
                                  overrides) {
    overrides = overrides || {};
    const defaults = defaultPresentableFields(resource);
    const presentableFields = _.merge({}, defaults, overrides);

    _.each(presentableFields, function (v, k) {
      controller[k] = v;
    });
  };

  return {
    forController: forController,
  };
};

export default DefaultCardPresenter;
