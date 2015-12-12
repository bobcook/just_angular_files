const autoRedirect = function ($window) {
  'ngInject';

  return {
    restrict: 'E',
    scope: {
      url: '=ssUrl',
      redirectIf: '&?ssRedirectIf',
    },
    link: function (scope, element, attrs) {
      const shouldRedirect = scope.redirectIf || _.constant(true);

      if (shouldRedirect()) {
        // Log so it's apparent why the browser is auto-redirecting
        console.log(`autoRedirect directive now redirecting to ${scope.url}`);

        $window.location = scope.url;
      }
    },
  };
};

export default autoRedirect;
