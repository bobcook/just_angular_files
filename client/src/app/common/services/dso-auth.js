const dsoAuth = function ($location, $cookies, ApiRoutes, $postHref, dsoSubscribe) {
  'ngInject';

  const login = function (promo = 'SS-BETA', redirectPath = $location.path()) {
    $postHref(
      ApiRoutes.AARP_AUTH, { promo: promo, redirectPath: redirectPath }
    );
  };

  const dsoSubscribeAuth = `https://appsec-s.aarp.org/smembership/` +
                         `subscription?promo=${dsoSubscribe.promo}&` +
                         `campaignURL=${$cookies.get('campaignURL')}&` +
                         `ref=${dsoSubscribe.callbackUrl}`;

  return {
    login: login,
    dsoSubscribeAuth: dsoSubscribeAuth,
  };
};

export default dsoAuth;
