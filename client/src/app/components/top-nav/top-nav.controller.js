const TopNavController = function (ApiRoutes,
                                   $scope,
                                   $state,
                                   $rootScope,
                                   $location,
                                   dsoAuth,
                                   CurrentUserPolicy,
                                   $element,
                                   $window) {
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

  this.useAd = () => {
    if (!$rootScope.$currentUser || $rootScope.$currentUser.isRegistered()) {
      return 'with-ad';
    } else {
      return 'no-ad';
    }
  };

  const isPaidUser = () => {
    return $rootScope.$currentUser && $rootScope.$currentUser.isPaid();
  };

  const getHeader = () => {
    return $element.find('.global-header');
  };

  const distanceFromTop = (el) => {
    const scrollTop = $(window).scrollTop();
    const elementOffset = el.offset().top;
    return elementOffset - scrollTop;
  };

  angular.element($window).on('scroll', () => {
    if (isPaidUser()) { return; }
    const section = getHeader();
    if (distanceFromTop(section) > 0) {
      section.css('position', 'absolute');
      section.css('width', '100%');
    }
  });

  angular.element($window).on('resize', () => {
    if (isPaidUser()) { return; }
    const section = getHeader();
    section.css('position', 'absolute');
    section.width(angular.element($window).width());

    if (section.width() < 767) {
      section.css('top', '290px');
      section.css('position', absolute);
    } else {
      section.css('top', '111px');
      section.css('position', absolute);
    }
  });
};

export default TopNavController;
