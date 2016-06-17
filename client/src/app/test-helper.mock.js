// Mock out the environment variable store
window.__env = {
  API_URL: 'example.com',
};

window.Krux = { user: '', segments: [] };

window.googletag = {
  defineSlot: function () {
    return window.googletag;
  },
  addService: function () {
    return window.googletag;
  },
  setTargeting: function () {
    return window.googletag;
  },
  defineSizeMapping: function () {
    return window.googletag;
  },
  pubAds: function () {
    return window.googletag;
  },
  refresh: function () {
    return window.googletag;
  },
  cmd: {
    push: function () {},
  },
};

// Custom test hook for loading the app.
// We need to inject a custom translation loader to avoid angular-translate
// making an HTTP request in our unit tests. Performing this mocking is the
// recommended workaround. See http://goo.gl/GsiyID.
window.loadApp = function () {
  return module('aarp-staying-sharp', function ($provide, $translateProvider) {
    $provide.factory('mockTranslationLoader', function ($q) {
      return function () { return $q.when({}); };
    });
    $provide.value('Airbrake', {});
    $translateProvider.useLoader('mockTranslationLoader');
  });
};
