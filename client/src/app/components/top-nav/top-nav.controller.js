import screenTypes from '../../common/services/screen-types';

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

  angular.element($window).on('scroll', () => {
    const $adContainer = $('.mast-head-ad-container');
    const $globalHeader = $adContainer.parent().parent();

    const screenType = screenTypes.getScreenType($window);
    const hideAtHeight = screenType === 'mobile' ? 0 : 1000;
    if ($window.scrollY < hideAtHeight) {
      $globalHeader.css('top', 0);
    } else {
      $globalHeader.css('top',
        -Math.min($adContainer.height(), $window.scrollY-hideAtHeight));
    }

    const $sidebar = $('.sticky-side-bar');
    const $article = $('.article-info-block');
    if ($article.length === 0) {
      return;
    }
    const articleTop = $article.offset().top - $window.scrollY;
    const $articleContent = $('.cp-content-detail');
    const articleBottom = $articleContent.offset().top +
      $articleContent.height() - $window.scrollY;
    const sidebarFixedTop = $globalHeader.offset().top -
      $window.scrollY + $globalHeader.height() + 20;
    //NOTE: we should not need to subtract 250 here but we could not
    // get the correct sidebar height programmatically for now
    const sidebarFixedBottom = articleBottom - ($sidebar.height() + 200);
    $sidebar
      .css('top', Math.max(articleTop,
            Math.min(sidebarFixedTop, sidebarFixedBottom)))
      .css('margin-top','-'+$article.css('margin-top'));
  });

  $scope.$watch(function () {
    return $('.mast-head-ad-container').parent().height();
  }, () => {
    const $placeHolder = $('.top-nav-placeholder');
    $placeHolder.height($('.mast-head-ad-container').parent().height());
  });
};

export default TopNavController;
