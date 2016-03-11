const TopNavController = function (ApiRoutes,
                                   $scope,
                                   $state,
                                   $rootScope,
                                   $location,
                                   dsoAuth,
                                   CurrentUserPolicy) {
  'ngInject';

  this.login = dsoAuth.login;
  this.isGamePlayView = $rootScope.isGamePlayView;

  $scope.$on('$stateChangeSuccess', () => {
    this.subscribeUrl = dsoAuth.dsoSubscribeAuth();
  });

  this.searchCategories = ['All content'];
  this.isMenuOpen = false;
  this.isSearchOpen = false;
  this.subscribeUrl = dsoAuth.dsoSubscribeAuth();

  this.submitSearch = function () {
    this.isSearchOpen = false;
    $state.go(
      'application.search-results',
      { q: this.keywords, type: _.snakeCase(this.selectedSearchCategory) }
    );
  };

  CurrentUserPolicy.get().then((policy) => {
    this.searchCategories =
      this.searchCategories.concat(policy.accessibleContent);
  });

  this.selectedSearchCategory = 'All content';
};

export default TopNavController;
