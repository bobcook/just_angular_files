const runBlock = function ($log, $window, $rootScope) {
  'ngInject';

  $rootScope.$on('$stateChangeSuccess', function (){
    $window.scrollTo(0, 0);
  });

  $log.debug('runBlock end');
};

export default runBlock;
