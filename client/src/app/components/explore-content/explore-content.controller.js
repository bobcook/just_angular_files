const ExploreContentController = function ($pagination, $scope) {
  'ngInject';

  this.selectedPillar = this.selectedPillar || null; // Via ss-selected-pillar
  this.resource = this.resource || null; // Should be defined via ss-resource
  this.perPage = null; // number of items is set in ExploreContent resource
  this.items = [];
  this.displayShowMore = true;
  this.completed = false;

  let paginator;

  this.showMore = () => {
    showMore(paginator.page + 1);
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
      params: {
        pillar: pillar,
      },
    });

    showMore(paginator.page);
  };

  $scope.$watch(() => this.selectedPillar, refreshItems);
};

export default ExploreContentController;
