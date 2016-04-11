const TopNavController = function (ApiRoutes,
                                   $scope,
                                   $state,
                                   $rootScope,
                                   $location,
                                   dsoAuth,
                                   CurrentUserPolicy) {
  'ngInject';

  this.login = dsoAuth.login;
  const intcmp = 'SSS-JOINSS-HEAD';

  this.isGamePlayView = $rootScope.isGamePlayView;
  this.gamePlayFalse = function () {
    $rootScope.isGamePlayView = false;
  };

  $scope.$on('$stateChangeSuccess', () => {
    this.subscribeUrl = dsoAuth.dsoSubscribeAuth(null, intcmp);
  });

  this.searchCategories = ['All content'];
  this.isMenuOpen = false;
  this.isSearchOpen = false;
  this.subscribeUrl = dsoAuth.dsoSubscribeAuth(null, intcmp);

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
