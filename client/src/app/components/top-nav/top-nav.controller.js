const TopNavController = function (ApiRoutes,
                                   $state,
                                   dsoAuth,
                                   CurrentUserPolicy) {
  'ngInject';

  this.login = dsoAuth.login;

  this.searchCategories = ['All content'];
  this.isMenuOpen = false;
  this.isSearchOpen = false;
  const promo = 'foo';
  const campaignURL = 'foo';
  const callbackUrl = 'foo';
  this.subscribeUrl = `https://appsec-s.aarp.org/smembership/subscription?` +
                        `promo=${promo}&campaignURL=${campaignURL}&` +
                        `ref=${callbackUrl}`;

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
