const ExploreContentController = function ($pagination) {
  'ngInject';

  this.selectedPillar = this.selectedPillar || null; // Via ss-selected-pillar
  this.resource = this.resource || null; // Should be defined via ss-resource
  this.perPage = null; // number of items is set in ExploreContent resource
  this.items = [];
  this.shownItems = this.items; // For restricting items based on filters
  this.displayShowMore = true;
  this.completed =  false;

  this.setShownItems = (newItems) => {
    this.shownItems = newItems;
  };

  this.showMore = () => {
    showMore($pagination.page + 1);
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

export default ExploreContentController;
