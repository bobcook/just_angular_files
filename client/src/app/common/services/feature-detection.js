const $featureDetection = function () {
  'ngInject';

  const isTouchDevice = function () {
    // from Modernizr: https://github.com/Modernizr/Modernizr/blob/
    // a23193bf25387ccca63a05e8c74d54ec1b458c5c/feature-detects/touchevents.js
    return !!(
      ('ontouchstart' in window) ||
        window.DocumentTouch && document instanceof DocumentTouch
    );
  };

  const hasFlash = function () {
    // http://stackoverflow.com/questions/998245/
    // how-can-i-detect-if-flash-is-installed-and-if-not-display-a-hidden-div-
    // that-inf
    try {
      const fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
      if (fo) {
        return !!fo;
      }
    } catch (e) {
      return !!(
        navigator.mimeTypes
        && navigator.mimeTypes['application/x-shockwave-flash'] !== undefined
        && navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin
      );
    }
    return false;
  };

  return {
    isTouchDevice: isTouchDevice,
    hasFlash: hasFlash,
  };
};

export default $featureDetection;
