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

  const dsoRegister = function () {
    return `https://login.aarp.org/online-community` +
    `/register/index?promo=SM-SS&referrer=${$location.path()}`;
  };

  const dsoSubscribeAuth = function () {
    const ssologinPath = buildSSOLoginPath($location.path());
    const campaignURL = $cookies.get('campaignURL') || 'BT1';
    return `${dsoSubscribe.domain}/smembership/` +
    `subscription?promo=${dsoSubscribe.promo}&` +
    `campaignURL=${campaignURL}&` +
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
    dsoRegister: dsoRegister,
  };
};

export default dsoAuth;
