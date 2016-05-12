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
  this.busyLoading = false;

  let paginator;

  this.showMore = () => {
    if (this.displayShowMore && !this.completed) {
      this.busyLoading = true;
      showMore(paginator.page + 1);
    }
  };

  // TODO: extract out duplication here, in explore page, and dashboard
  this.itemsInRow = function (offset, items) {
    if (items == null) { return []; }
    const chunks = _.chunk(items, this.perRow);
    const chunkNum = offset / this.perRow;
    return chunks[chunkNum];
  };

  this.showInlineEncouragementMessage = (index) => {
    return this.isUserNamespace &&
      this.completed &&
      !noRemainder() &&
      lastItem(index);
  };

  this.showStandAloneEncouragementMessage = () => {
    return this.isUserNamespace &&
      this.completed &&
      noRemainder();
  };

  const noRemainder = () => {
    return this.items.length % this.perRow === 0;
  };

  const lastItem = (index) => {
    return this.items.length - 1 === index;
  };

  const showMore = (page, initialCheck = false) => {
    paginator.showMore(page).then((items) => {
      this.items = items;
      this.completed = paginator.completed;
      this.busyLoading = false;

      if (initialCheck) $scope.$emit('manualCheckLoadMore');
    });
  };

  const refreshItems = () => {
    if (!this.selectedPillar) { return; }

    const pillar = this.selectedPillar && this.selectedPillar.slug !== 'all'
                 ? this.selectedPillar.slug
                 : null;

    paginator = $pagination.create({
      displayShowMore: this.displayShowMore,
      perPage: this.perPage,
      resource: this.resource,
      params: { pillar },
    });

    showMore(paginator.page, true);
  };

  $scope.$watch(() => this.selectedPillar, refreshItems);
};

export default CardsController;
