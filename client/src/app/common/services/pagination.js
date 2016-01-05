const $pagination = function ($q) {
  'ngInject';

  const MorePages = {};
  const NoMorePages = {};

  const create = (options) => {
    const displayShowMore = options.displayShowMore;
    const perPage = options.perPage;
    const resource = options.resource;
    const params = options.params || {};

    let completed = false;
    let items = [];
    let page = 0;

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
      return items;
    };

    const showMore = (page) => {
      if (!displayShowMore) { return $q.resolve(null); }
      const options = _.merge({}, params, {
        page: page,
        perPage: perPage,
      });
      return resource.query(options).then(interpretResponse);
    };

    const paginator = { showMore };

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
