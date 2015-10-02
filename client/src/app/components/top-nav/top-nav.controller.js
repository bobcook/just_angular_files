var TopNavController = function (ApiRoutes) {
  'ngInject';

  this.loginUrl = ApiRoutes.AARP_AUTH;

  this.isMenuOpen = false;
  this.isSearchOpen = false;

  this.searchCategories = ['All content', 'Option 1', 'Option 2'];
  this.selectedSearchCategory = 'All content';
};

export default TopNavController;
