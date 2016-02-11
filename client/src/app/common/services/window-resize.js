const $windowResize = function ($window) {
  'ngInject';

  const bind = function (fnToBind) {
    angular.element($window).bind('resize', fnToBind);
  };

  return {
    bind: bind,
  };
};

export default $windowResize;
