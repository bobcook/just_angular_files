const dsoAuth = function ($location,
                          $cookies,
                          $state,
                          ApiRoutes,
                          $postHref,
                          dsoSubscribe,
                          dsoRegister,
                          dsoBilling) {
  'ngInject';

  const login = function (redirectPath = $location.path(), promo = 'SM-SS') {
    $postHref(
      ApiRoutes.AARP_AUTH, { promo: promo, redirectPath: redirectPath }
    );
  };

  const dsoBillingPath = function (promo = 'SM-SS') {
    const ssologinPath = buildSSOLoginPath($state.href('application.home'));
    return `${dsoBilling.url}?promo=${promo}&ref=${ssologinPath}`;
  };

  const dsoRegisterAuth = function (redirectPath = $location.path(),
                                    promo = 'SM-SS') {
    const ssologinPath = buildSSOLoginPath(redirectPath);
    return `${dsoRegister.domain}/online-community` +
    `/register/index?promo=${promo}&referrer=${ssologinPath}`;
  };

  const dsoSubscribeAuth = function (redirectPath = $location.path(),
                                     intcmp = null,
                                     campaignURL = null,
                                     promo = null,
                                     action = null) {
    intcmp = intcmp ? `intcmp=${intcmp}&` : intcmp;
    promo = promo || dsoSubscribe.promo;
    campaignURL = campaignURL || ($cookies.get('campaignURL') || '');
    action = action || 'subscription';
    const ssologinPath = buildSSOLoginPath(redirectPath);
    return `${dsoSubscribe.domain}/smembership/` +
      `${action}?promo=${promo}&` +
      (campaignURL === '' ? '' : `campaignURL=${campaignURL}&`) +
      `${intcmp}` +
      `ref=${ssologinPath}`;
  };

  const buildSSOLoginPath = function (redirectPath) {
    const protocol = $location.protocol();
    const host = $location.host();
    const redirect = redirectPath || '/';
    return `${protocol}://${host}/ssologin?link=${redirect}`;
  };

  return {
    login: login,
    dsoSubscribeAuth: dsoSubscribeAuth,
    dsoRegisterAuth: dsoRegisterAuth,
    dsoBillingPath: dsoBillingPath,
  };
};

export default dsoAuth;
