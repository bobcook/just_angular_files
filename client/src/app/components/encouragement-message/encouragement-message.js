const encouragementMessage = function () {
  return {
    controller: 'EncouragementMessageController',
    controllerAs: 'vm',
    bindToController: true,
    templateUrl:
      'app/components/encouragement-message/encouragement-message.html',
    restrict: 'E',
    replace: true,
    scope: {
      resource: '=ssResource',
    },
  };
};

export default encouragementMessage;
