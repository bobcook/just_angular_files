const socialLinks = function () {
  return {
    controller: 'SocialLinksController',
    controllerAs: 'vm',
    bindToController: true,
    restrict: 'EA',
    templateUrl: 'app/components/social-links/social-links.html',
    scope: {
      title: '=ssTitle',
      pageURL: '=ssPageUrl',
      resourceName: '=ssResourceName',
    },
  };
};

export default socialLinks;
