const dsoAuth = function ($location, ApiRoutes, $postHref, dsoSubscribe) {
  'ngInject';

  const login = function (promo = 'SS-BETA', redirectPath = $location.path()) {
    $postHref(
      ApiRoutes.AARP_AUTH, { promo: promo, redirectPath: redirectPath }
    );
  };

  const dsoSubscribeAuth = `https://appsec-s.aarp.org/smembership/` +
                         `subscription?promo=${dsoSubscribe.promo}&` +
                         `campaignURL=${dsoSubscribe.campaignUrl}&` +
                         `ref=${dsoSubscribe.callbackUrl}`;

  return {
    login: login,
    dsoSubscribeAuth: dsoSubscribeAuth,
  };
};

export default dsoAuth;
