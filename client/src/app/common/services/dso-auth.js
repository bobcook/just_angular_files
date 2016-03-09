const dsoAuth = function ($location,
                          $cookies,
                          ApiRoutes,
                          $postHref,
                          dsoSubscribe) {
  'ngInject';

  const login = function (redirectPath = $location.path(), promo = 'SS-BETA') {
    $postHref(
      ApiRoutes.AARP_AUTH, { promo: promo, redirectPath: redirectPath }
    );
  };

  const dsoSubscribeAuth = function (redirectPath) {
    const ssologinPath = buildSSOLoginPath(redirectPath);
    return `${dsoSubscribe.domain}/smembership/` +
    `subscription?promo=${dsoSubscribe.promo}&` +
    `campaignURL=${$cookies.get('campaignURL')}&` +
    `ref=${ssologinPath}`;
  };

  const buildSSOLoginPath = function (redirectPath) {
    const protocol = $location.protocol();
    const host = $location.host();
    return `${protocol}://${host}/ssologin?link=${redirectPath}`;
  };

  return {
    login: login,
    dsoSubscribeAuth: dsoSubscribeAuth,
  };
};

export default dsoAuth;
