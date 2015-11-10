const CardsController = function ($pagination) {
  'ngInject';

  this.selectedPillar = this.selectedPillar || null; // Via ss-selected-pillar
  this.resource = this.resource || null; // Should be defined via ss-resource
  this.perPage = this.perPage || 8; // Defined via ss-per-page
  this.perRow = this.perRow || 2; // Defined via ss-per-row
  this.cardClasses = this.cardClasses || ''; // Defined via ss-card-classes
  this.items = this.items || []; // Defined via ss-items
  this.shownItems = this.items; // For restricting items based on filters
  if (_.isUndefined(this.displayShowMore) || _.isNull(this.displayShowMore)) {
    this.displayShowMore = true; // Defined via ss-show-more
  }

  this.completed = false;

  this.setShownItems = (newItems) => {
    this.shownItems = newItems;
  };

  this.showMore = () => {
    showMore($pagination.page + 1);
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
    $pagination.showMore(page).then((items) => {
      this.items = items;
      this.completed = $pagination.completed;
    });
  };

  $pagination.init({
    displayShowMore: this.displayShowMore,
    perPage: this.perPage,
    resource: this.resource,
  });

  showMore($pagination.page);

};

export default CardsController;
