import infiniteScrollHelpers from
  '../../common/services/infinite-scroll-helpers';

const ExploreContentController = function ($pagination,
                                           $scope,
                                           $window,
                                           $location,
                                           $timeout,
                                           $state,
                                           $rootScope,
                                           CacheFactory) {
  'ngInject';

  this.selectedPillar = this.selectedPillar || null; // Via ss-selected-pillar
  this.resource = this.resource || null; // Should be defined via ss-resource
  this.perPage = null; // number of items is set in ExploreContent resource
  this.items = [];
  this.displayShowMore = true;
  this.completed = false;
  this.busyLoading = false;
  const paginatedItemSelector = '.infinite-scroll-item';
  const initialPageNum = parseInt($location.hash());
  const infiniteScroll =
    infiniteScrollHelpers($state.current.name, CacheFactory);
  let paginator;

  infiniteScroll.trackPageNumber(
    paginatedItemSelector,
    $rootScope
  );

  this.showMore = () => {
    if (!(this.displayShowMore && !this.completed && !this.busyLoading)) {
      return;
    }
    this.busyLoading = true;
    return paginator.showMore().then((items) => {
      this.items = items;
      this.completed = paginator.completed;
      this.busyLoading = false;
    });
  };

  $rootScope.$on('$stateChangeStart', () => {
    this.busyLoading = true;
  });

  const paginatorOptions = (pillar) => {
    return {
      displayShowMore: this.displayShowMore,
      perPage: this.perPage,
      resource: this.resource,
      params: {
        pillar: pillar,
      },
    };
  };

  const refreshItems = () => {
    if (!this.selectedPillar) { return; }

    const pillar = this.selectedPillar && this.selectedPillar.slug !== 'all'
                 ? this.selectedPillar.slug
                 : null;

    paginator = $pagination.create(paginatorOptions(pillar));
    paginator.catchUp(initialPageNum, 1).then((items) => {
      if (items) {
        this.items = items;
        this.busyLoading = false;
        if (initialPageNum) {
          infiniteScroll.scrollToPage(
            paginatedItemSelector,
            initialPageNum,
            $timeout
          );
        }
        $scope.$emit('manualCheckLoadMore');
      }
    });
  };

  $scope.$watch(() => this.selectedPillar, refreshItems);
};

export default ExploreContentController;
