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

  return {
    isTouchDevice: isTouchDevice,
  };
};

export default $featureDetection;
