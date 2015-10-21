const CardsController = function ($pillarFiltering) {
  'ngInject';

  const MorePages = {};
  const NoMorePages = {};

  // only saveable resources (UserArticles, UserRecipes) have a parentResource
  this.parentResource = this.parentResource || null;
  this.selectedPillar = this.selectedPillar || null; // Via ss-selected-pillar
  this.resource = this.resource || null; // Should be defined via ss-resource
  this.perPage = this.perPage || 8; // Defined via ss-per-page
  this.perRow = this.perRow || 2; // Defined via ss-per-row
  this.cardClasses = this.cardClasses || ''; // Defined via ss-card-classes
  this.items = [];
  this.shownItems = this.items;
  this.page = 0;
  this.completed = false;

  this.setShownItems = (newItems) => {
    this.shownItems = newItems;
  };

  this.showMore = () => {
    showMore(this.page + 1);
  };

  this.range = function (num) {
    return _.range(0, num);
  };

  this.itemsInRow = function (offset, items) {
    const chunks = _.chunk(items, this.perRow);
    const chunkNum = offset / this.perRow;
    return chunks[chunkNum];
  };

  const showMore = (page) => {
    const options = {
      page: page,
      perPage: this.perPage,
    };
    this.resource.query(options).then(interpretResponse);
  };

  const actionFor = function (response) {
    return (response.status === 200) ? NoMorePages : MorePages;
  };

  const interpretResponse = function (response) {
    return interpret(actionFor(response), response);
  };

  const interpret = (action, response) => {
    concatNextPage(response.data);

    if (action === NoMorePages) { this.completed = true; }
  };

  const concatNextPage = (items) => {
    this.page += 1;
    this.items = this.items.concat(items);
  };

  showMore(this.page);
};

export default CardsController;
