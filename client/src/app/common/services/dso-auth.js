const dsoAuth = function ($location, ApiRoutes, $postHref, dsoSubscribe) {
  'ngInject';

  const login = function (promo = 'SS-BETA') {
    $postHref(
      ApiRoutes.AARP_AUTH, { promo: promo, redirectPath: $location.path() }
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
