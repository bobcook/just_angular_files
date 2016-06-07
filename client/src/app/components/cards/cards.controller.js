import cacheHelpers from '../../common/services/cache-helpers';
import infiniteScrollHelpers from
  '../../common/services/infinite-scroll-helpers';

const CardsController = function ($pagination,
                                  $scope,
                                  $timeout,
                                  $location,
                                  $state,
                                  $window,
                                  $rootScope,
                                  $pillarFiltering,
                                  CacheFactory) {
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
  const paginatedItemSelector = '.infinite-scroll-item';
  const initialPageNum = () => {
    return parseInt($location.hash());
  };
  const infiniteScroll =
    infiniteScrollHelpers($state.current.name, CacheFactory);
  let paginator;

  infiniteScroll.trackPageNumber(
    paginatedItemSelector,
    $rootScope
  );

  $rootScope.$on('$stateChangeStart', () => {
    this.busyLoading = true;
  });

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

  this.dataPageNum = (index) => {
    return Math.floor(index / this.perPage) + 1;
  };

  const noRemainder = () => {
    return this.items.length % this.perRow === 0;
  };

  const lastItem = (index) => {
    return this.items.length - 1 === index;
  };

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
    paginator.catchUp(initialPageNum(), this.perPage).then((items) => {
      if (items) {
        this.items = items;
        this.busyLoading = false;
        if (initialPageNum()) {
          infiniteScroll.scrollToPage(
            paginatedItemSelector,
            initialPageNum(),
            $timeout
          );
        }
        $scope.$emit('manualCheckLoadMore');
      }
    });
  };

  $scope.$watch(() => this.selectedPillar, () => { refreshItems(); });
};

export default CardsController;
