const TopNavController = function (ApiRoutes, $state) {
  'ngInject';

  this.loginUrl = `${ApiRoutes.AARP_AUTH}?promo=SS-BETA`;

  this.isMenuOpen = false;
  this.isSearchOpen = false;

  this.submitSearch = function () {
    this.isSearchOpen = false;
    $state.go(
      'application.search-results',
      { q: this.keywords, type: _.snakeCase(this.selectedSearchCategory) }
    );
  };

  this.showInTopNav = function () {
    return $state.$current.url.source !== '/see-you-in-march';
  };

  this.searchCategories =
    ['All content', 'Articles', 'Activities', 'Games', 'Recipes'];
  this.selectedSearchCategory = 'All content';
};

export default TopNavController;
