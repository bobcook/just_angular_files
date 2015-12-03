const $pagination = function ($q) {
  'ngInject';

  // TODO: change to ES6 class per this conversation
  // https://github.com/philosophie/aarp-staying-sharp/
  // pull/97#discussion_r44610726

  const MorePages = {};
  const NoMorePages = {};

  this.init = (options) => {
    this.displayShowMore = options.displayShowMore;
    this.perPage = options.perPage;
    this.resource = options.resource;
    this.page = 0;
    this.items = [];
    this.completed = false;
  };

  this.showMore = (page) => {
    if (!this.displayShowMore) { return $q.resolve(null); }
    const options = {
      page: page,
      perPage: this.perPage,
    };
    return this.resource.query(options).then(interpretResponse);
  };

  const actionFor = function (response) {
    return (response.status === 200) ? NoMorePages : MorePages;
  };

  const interpretResponse = function (response) {
    return interpret(actionFor(response), response);
  };

  const interpret = (action, response) => {
    if (action === NoMorePages) { this.completed = true; }
    return concatNextPage(response.data);
  };

  const concatNextPage = (items) => {
    this.page += 1;
    this.items = this.items.concat(items);
    return this.items;
  };

  return this;
};

export default $pagination;
