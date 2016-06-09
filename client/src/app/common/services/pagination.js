import cacheHelpers from './cache-helpers';

const $pagination = function ($q, CacheFactory) {
  'ngInject';

  const MorePages = {};
  const NoMorePages = {};

  const create = (options) => {
    const displayShowMore = options.displayShowMore;
    const perPage = options.perPage;
    const resource = options.resource;
    const params = options.params || {};
    let page = 1;

    let completed = false;
    let items = [];

    const actionFor = function (response) {
      return (response.status === 200) ? NoMorePages : MorePages;
    };

    const interpretResponse = function (response) {
      return interpret(actionFor(response), response);
    };

    const interpret = (action, response) => {
      if (action === NoMorePages) { completed = true; }
      return concatNextPage(response.data);
    };

    const concatNextPage = (newItems) => {
      page += 1;
      items = items.concat(newItems);
      getCache().put('items', items);
      return items;
    };

    const showMore = () => {
      if (!displayShowMore) { return $q.resolve(null); }
      const options = _.merge({}, params, {
        page: page,
        perPage: perPage,
      });
      return resource.query(options).then(interpretResponse);
    };

    const catchUp = (targetPage, elemsPerPage) => {
      targetPage = targetPage || 1;
      const cacheItems = getCache().get('items');
      if (cacheItems && cacheItems.length >= targetPage * elemsPerPage) {
        items = cacheItems;
        page = Math.ceil((items.length + 1) / elemsPerPage);
        return $q.resolve(cacheItems);
      } else {
        return showMore().then(function () {
          return catchUp(targetPage, elemsPerPage);
        });
      }
    };

    const getCache = () => {
      const contentName = resource.contentName;
      return cacheHelpers.getOrCreateCache(CacheFactory, contentName);
    };

    const paginator = { showMore: showMore, catchUp: catchUp };

    Object.defineProperties(paginator, {
      completed: { get: () => completed },
      items:     { get: () => items },
      page:      { get: () => page },
    });

    return paginator;
  };

  return { create };
};

export default $pagination;
