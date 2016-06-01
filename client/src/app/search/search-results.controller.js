const SearchResultsController = function ($scope, PerformSearch) {
  'ngInject';

  this.perPage = 5;
  this.currentPage = 1;

  const search = () => {
    PerformSearch.search(this.currentPage, this.selectedPillar)
    .then((results) => {
      this.results = results.items;
      this.totalCount = results.totalCount;
    });
  };

  this.pageChanged = function (newPage) {
    search();
  };

  const filterSearchResults = (pillar) => {
    if (!pillar) { return; }
    // ensure we always start on first page of filtered search results.
    // setting currentPage triggers pageChanged
    if (this.currentPage !== 1) {
      this.currentPage = 1;
    } else {
      search();
    }
  };

  $scope.$watch(() => this.selectedPillar, filterSearchResults);

  this.selectedPillar = null; // Will be overwritten by pillar filters
};

export default SearchResultsController;
