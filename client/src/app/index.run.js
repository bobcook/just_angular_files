const runBlock = function ($currentUser, $log, $rootScope) {
  'ngInject';

  $log.debug('runBlock end');

  $rootScope.$currentUser = $currentUser;
};

export default runBlock;
