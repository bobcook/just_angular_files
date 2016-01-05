const CardsController = function ($pagination, $scope) {
  'ngInject';

  this.selectedPillar = this.selectedPillar || null; // Via ss-selected-pillar
  this.resource = this.resource || null; // Should be defined via ss-resource
  this.perPage = this.perPage || 8; // Defined via ss-per-page
  this.perRow = this.perRow || 2; // Defined via ss-per-row
  this.cardClasses = this.cardClasses || ''; // Defined via ss-card-classes
  this.items = this.items || []; // Defined via ss-items
  if (this.displayShowMore == null) {
    this.displayShowMore = true; // Defined via ss-show-more
  }

  this.completed = false;

  let paginator;

  this.showMore = () => {
    showMore(paginator.page + 1);
  };

  // TODO: extract out duplication here, in explore page, and dashboard
  this.itemsInRow = function (offset, items) {
    if (items == null) { return []; }
    const chunks = _.chunk(items, this.perRow);
    const chunkNum = offset / this.perRow;
    return chunks[chunkNum];
  };

  const showMore = (page) => {
    paginator.showMore(page).then((items) => {
      this.items = items;
      this.completed = paginator.completed;
    });
  };

  const refreshItems = () => {
    const pillar = this.selectedPillar && this.selectedPillar.slug !== 'all'
                 ? this.selectedPillar.slug
                 : null;

    paginator = $pagination.create({
      displayShowMore: this.displayShowMore,
      perPage: this.perPage,
      resource: this.resource,
      params: { pillar },
    });

    showMore(paginator.page);
  };

  $scope.$watch(() => this.selectedPillar, refreshItems);
};

export default CardsController;
