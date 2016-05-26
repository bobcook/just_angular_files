const screenSizes = {
  mobile: { min: 0, max: 767 },
  tablet: { min: 768, max: 991 },
  desktop: { min: 992, max: Infinity },
};

const getScreenType = function ($window) {
  const windowSize = $window.innerWidth;
  let screenType = null;

  if (windowSize <= screenSizes.mobile.max) {
    screenType = 'mobile';
  } else if (windowSize <= screenSizes.tablet.max) {
    screenType = 'tablet';
  } else {
    screenType = 'desktop';
  }

  return screenType;
};

const getScreenTypeMinSize = function (screenType) {
  return screenSizes[screenType].min;
};

const getScreenTypeMaxSize = function (screenType) {
  return screenSizes[screenType].max;
};

export default {
  getScreenType: getScreenType,
  getScreenTypeMinSize: getScreenTypeMinSize,
  getScreenTypeMaxSize: getScreenTypeMaxSize,
};
