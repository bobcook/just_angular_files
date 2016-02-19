const TopNavController = function (ApiRoutes, $state, dsoAuth) {
  'ngInject';

  this.login = dsoAuth.login;

  this.isMenuOpen = false;
  this.isSearchOpen = false;

  this.submitSearch = function () {
    this.isSearchOpen = false;
    $state.go(
      'application.search-results',
      { q: this.keywords, type: _.snakeCase(this.selectedSearchCategory) }
    );
  };

  this.searchCategories =
    ['All content', 'Articles', 'Activities', 'Games', 'Recipes'];
  this.selectedSearchCategory = 'All content';
};

export default TopNavController;
