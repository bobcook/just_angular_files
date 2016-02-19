const dsoAuth = function ($location, ApiRoutes, $postHref) {
  'ngInject';

  const login = function () {
    $postHref(
      ApiRoutes.AARP_AUTH, { promo: 'SS-BETA', redirectPath: $location.path() }
    );
  };

  return {
    login: login,
  };
};

export default dsoAuth;
